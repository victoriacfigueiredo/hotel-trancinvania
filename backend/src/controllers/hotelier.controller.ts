import { z } from "zod";

const passwordValidation = z.string().min(7, { message: "A senha deve ter mais de 6 dígitos" });

export const hotelierSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  username: z.string().min(3, { message: "Usuário deve ter pelo menos 3 caracteres" }),
  password: passwordValidation,
  hotelName: z.string().min(1, { message: "Nome do Hotel é obrigatório" }),
  hotelAddress: z.string().min(1, { message: "Endereço do Hotel é obrigatório" }),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, { message: "CNPJ Inválido" }),
}).refine(data => {
  const { password, name, hotelName, cnpj } = data;

  // Verificação para garantir que a senha não contenha o nome do usuário, nome do hotel ou CNPJ
  const cnpjDigits = cnpj.replace(/[^\d]/g, "");

  if (password.includes(name)) {
    return false;
  }

  if (password.includes(hotelName)) {
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
