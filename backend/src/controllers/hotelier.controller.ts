import { z } from "zod";

const passwordValidation = z.string().min(7, { message: "Password must be more than 6 characters" });

export const hotelierSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: passwordValidation,
  hotelName: z.string().min(1, { message: "Hotel name is required" }),
  hotelAddress: z.string().min(1, { message: "Hotel address is required" }),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, { message: "Invalid CNPJ" }),
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
