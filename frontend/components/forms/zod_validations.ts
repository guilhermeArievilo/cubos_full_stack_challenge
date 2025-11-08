import z from "zod";

export const nameValidation = z.string().min(2, "Insira um nome válido.");
export const lastNameValidation = z.string().optional();
export const emailValidation = z.email("E-mail inválido");
export const phoneValidation = z
  .string()
  .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido");
export const passwordValidation = z.string().min(6, {
  message: "Insira uma senha válida.",
});