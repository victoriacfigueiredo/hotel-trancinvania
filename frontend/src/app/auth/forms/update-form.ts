import { z } from "zod";

const passwordValidation = z.union([
  z.string().min(7, { message: "A senha deve ter mais de 6 dígitos" }),
  z.string().length(0),
]);

export const UpdateClientSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }).optional(),
  email: z.string().email({ message: "E-mail inválido" }).optional(),
  username: z
    .string()
    .min(3, { message: "Usuário deve ter pelo menos 3 caracteres" })
    .optional()
    .or(z.literal("")),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" })
    .optional(),
  phone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, { message: "Telefone inválido" })
    .optional(),
  birthDate: z.string().optional(),
  password: passwordValidation.optional(),
});

export const UpdateHotelierSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }).optional(),
  username: z
    .string()
    .min(3, { message: "Usuário deve ter pelo menos 3 caracteres" })
    .optional(),
  password: passwordValidation,
});

export type UpdateClientFormInputs = z.infer<typeof UpdateClientSchema>;
export type UpdateHotelierFormInputs = z.infer<typeof UpdateHotelierSchema>;
