import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { validateData } from '../middleware/validation-middleware';
import HotelierService from '../services/hotelier.service';

const passwordValidation = z.string().min(7, { message: "A senha deve ter mais de 6 dígitos" });
const passwordValidationOptional = z.string().min(7, { message: "A senha deve ter mais de 6 dígitos" }).optional();

const hotelierSchemaOptional = z
    .object({
        name: z.string().min(1, { message: 'Nome é obrigatório' }).optional(),
        email: z.string().email({ message: 'E-mail inválido' }).optional(),
        username: z.string().min(3, { message: 'Usuário deve ter pelo menos 3 caracteres' }).optional(),
        password: passwordValidationOptional,
        hotel: z.string().min(1, { message: "Nome do Hotel é obrigatório" }).optional(),
        adress: z.string().min(1, { message: "Endereço do Hotel é obrigatório" }).optional(),
        cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, { message: "CNPJ Inválido" }).optional()
    });

export const hotelierSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  username: z.string().min(3, { message: "Usuário deve ter pelo menos 3 caracteres" }),
  password: passwordValidation,
  hotel: z.string().min(1, { message: "Nome do Hotel é obrigatório" }),
  adress: z.string().min(1, { message: "Endereço do Hotel é obrigatório" }),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, { message: "CNPJ Inválido" }),
}).refine(data => {
  const { password, name, hotel, cnpj } = data;

  // Verificação para garantir que a senha não contenha o nome do usuário, nome do hotel ou CNPJ
  const cnpjDigits = cnpj.replace(/[^\d]/g, "");

  if (password.includes(name)) {
    return false;
  }

  if (password.includes(hotel)) {
    return false;
  }

  if (password.includes(cnpjDigits)) {
    return false;
  }

  return true;
}, {
  message: "Password cannot contain your name, hotel name, or CNPJ",
  path: ["password"],
});

export type Hotelier = z.infer<typeof hotelierSchema>;

export default class HotelierController {
  private hotelierService: HotelierService;

  constructor() {
    this.hotelierService = new HotelierService();
  }

  public setupRoutes(router: Router) {
    router.post('/hotelier/register', validateData(hotelierSchema), (req, res) => this.registerHotelier(req, res));
    router.get('/hotelier/read/:id', (req, res) => this.getHotelier(req, res));
        router.get('/hotelier/list', (req, res) => this.getAllHoteliers(req, res));
        router.patch('/hotelier/update/:id', validateData(hotelierSchemaOptional), (req, res) => this.updateHotelier(req, res));
        router.delete('/hotelier/delete/:id', (req, res) => this.deleteHotelier(req, res));
  }

  private async registerHotelier(req: Request, res: Response) {
    try {
      const validatedData = req.body;
      const newHotelier = await this.hotelierService.createHotelier(validatedData);
      res.status(201).json(newHotelier);
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

  private async getHotelier(req: Request, res: Response) {
    try {
        const hotelierId = parseInt(req.params.id, 10);
        const hotelier = await this.hotelierService.getHotelierById(hotelierId);
        if (!hotelier) {
            return res.status(404).json({ message: 'Hoteleiro não encontrado' });
        }
        res.status(200).json(hotelier);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
}

private async updateHotelier(req: Request, res: Response) {
    try {
        const hotelierId = parseInt(req.params.id, 10);
        const updateData = req.body;
        const updatedHotelier = await this.hotelierService.updateHotelier(hotelierId, updateData);
        res.status(200).json(updatedHotelier);
    } catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(400).json({ errors: e.errors });
        }
        if (e instanceof Error) {
            if (e.message === 'Hoteleiro não encontrado') {
                return res.status(404).json({ message: e.message });
            }
            if (e.message === 'E-mail ou nome de usuário já existe.') {
                return res.status(400).json({ message: e.message });
            }
        }
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
}

private async deleteHotelier(req: Request, res: Response) {
    try {
        const hotelierId = parseInt(req.params.id, 10);
        await this.hotelierService.deleteHotelier(hotelierId);
        res.status(204).send();
    } catch (e) {
        if (e instanceof Error) {
            if (e.message === 'Hoteleiro não encontrado') {
                return res.status(404).json({ message: e.message });
            }
        }
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
}

private async getAllHoteliers(req: Request, res: Response) {
  try {
      const hotelier = await this.hotelierService.getAllHoteliers();
      res.status(200).json(hotelier);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
}