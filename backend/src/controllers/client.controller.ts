import { z } from 'zod';
import { Request, Response, Router } from 'express';
import { validateData } from '../middleware/validation-middleware';
import ClientService from '../services/client.service';

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const passwordValidation = z.string().min(7, { message: 'A senha deve ter mais de 6 dígitos' });

const dateSchema = z.string().refine(
    (date) => {
        if (!dateRegex.test(date)) {
            return false;
        }
        const [day, month, year] = date.split('/').map(Number);
        const dateObj = new Date(year, month - 1, day);
        return (
            dateObj.getFullYear() === year &&
            dateObj.getMonth() === month - 1 &&
            dateObj.getDate() === day
        );
    },
    {
        message: 'Invalid date format or date is not valid.',
    },
);

export const customerSchema = z
    .object({
        name: z.string().min(1, { message: 'Nome é obrigatório' }),
        email: z.string().email({ message: 'E-mail inválido' }),
        username: z.string().min(3, { message: 'Usuário deve ter pelo menos 3 caracteres' }),
        password: passwordValidation,
        cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido' }),
        phone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, { message: 'Telefone inválido' }),
        birthDate: z.string(),
    })
    .refine(
        (data) => {
            const { password, name, cpf, birthDate } = data;

            // Verificação para garantir que a senha não contenha o nome do usuário, CPF ou data de nascimento
            const cpfDigits = cpf.replace(/[^\d]/g, '');
            console.log('data ', birthDate)
            // const nascimento = new Date(birthDate);
            // const nascimentoStr = `${nascimento.getDate()}${
            //     nascimento.getMonth() + 1
            // }${nascimento.getFullYear()}`;

            if (password.includes(name)) {
                return false;
            }

            if (password.includes(cpfDigits)) {
                return false;
            }

            if (password.includes(birthDate)) {
                return false;
            }

            return true;
        },
        {
            message: 'A senha não pode conter seu nome, CPF ou data de nascimento',
            path: ['password'],
        },
    );

export type Customer = z.infer<typeof customerSchema>;

export default class ClientController {
    private clientService: ClientService;

    constructor() {
        this.clientService = new ClientService();
    }

    public setupRoutes(router: Router) {
        router.post('/client/register', validateData(customerSchema), (req, res) =>
            this.registerClient(req, res),
        );
    }

    private async registerClient(req: Request, res: Response) {
        try {
            const validatedData = req.body;
            const newCustomer = await this.clientService.createClient(validatedData);
            res.status(201).json(newCustomer);
        } catch (e: unknown) {
            if (e instanceof z.ZodError) {
                return res.status(400).json({ errors: e.errors });
            }
            if (e instanceof Error) {
                if (e.message === 'E-mail ou nome de usuário já existe.') {
                    return res.status(400).json({ message: e.message });
                }
            }
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
