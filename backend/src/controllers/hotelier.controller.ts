import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { validateData } from '../middleware/validation-middleware';
import HotelierService from '../services/hotelier.service';

const passwordValidation = z.string().min(7, { message: "A senha deve ter mais de 6 dígitos" });

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
}