import { z } from "zod";

export const RegisterClientSchema = z
  .object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z.string().email({ message: "E-mail inválido" }),
    username: z
      .string()
      .min(3, { message: "Usuário deve ter pelo menos 3 caracteres" }),
    password: z
      .string()
      .min(7, { message: "A senha deve ter mais de 6 dígitos" }),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" }),
    phone: z
      .string()
      .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, { message: "Telefone inválido" }),
    birthDate: z.string(),
    confirmPassword: z
      .string()
      .min(7, { message: "A confirmação de senha deve ter mais de 6 dígitos" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export type RegisterClientFormInputs = z.infer<typeof RegisterClientSchema>;
