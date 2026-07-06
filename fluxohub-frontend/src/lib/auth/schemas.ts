import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Mínimo 8 caracteres")
  .regex(/[A-Z]/, "Inclua ao menos uma letra maiúscula")
  .regex(/[0-9]/, "Inclua ao menos um número")
  .regex(/[^A-Za-z0-9]/, "Inclua ao menos um caractere especial");

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail obrigatório")
    .email("Digite um e-mail válido")
    .toLowerCase()
    .trim(),
  password: z.string().min(1, "Senha obrigatória"),
  rememberMe: z.boolean().default(false),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nome deve ter ao menos 2 caracteres")
      .max(100, "Nome muito longo")
      .trim(),
    email: z.string().min(1, "E-mail obrigatório").email("E-mail inválido").toLowerCase().trim(),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirmação obrigatória"),
    role: z.enum(["CLIENTE", "LOJISTA"]).default("CLIENTE"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
