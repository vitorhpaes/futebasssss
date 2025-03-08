import { z } from 'zod';
import { UserRole } from '../../context/authStore';

// Schema para validação de credenciais de login
export const loginCredentialsSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  role: z.enum(['admin', 'player'] as const),
});

// Schema para validação de resposta de login
export const loginResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['admin', 'player'] as const),
  }),
  token: z.string(),
});

// Schema para erros de API
export const apiErrorSchema = z.object({
  statusCode: z.number(),
  message: z.string().or(z.array(z.string())),
  error: z.string().optional(),
});

// Tipos extraídos dos schemas
export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;

// Interface para registro de usuário (será implementada futuramente)
export const registerUserSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  role: z.enum(['admin', 'player'] as const),
});

export type RegisterUser = z.infer<typeof registerUserSchema>;

// Interface para reset de senha (será implementada futuramente)
export const passwordResetSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

export type PasswordReset = z.infer<typeof passwordResetSchema>;

// Interface para confirmar reset de senha (será implementada futuramente)
export const confirmPasswordResetSchema = z.object({
  token: z.string(),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type ConfirmPasswordReset = z.infer<typeof confirmPasswordResetSchema>; 