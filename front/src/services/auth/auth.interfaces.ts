import { z } from 'zod';

// Schema para validação de credenciais de login
export const loginCredentialsSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  // O backend não possui 'role' no DTO de login, mas sim 'type' no usuário
});

// Schema para validação de resposta de login
export const loginResponseSchema = z.object({
  access_token: z.string(), // O backend retorna access_token, não token
  user: z.object({
    id: z.number(),
    name: z.string().nullable(),
    email: z.string().email(),
    type: z.enum(['PLAYER', 'ADMIN'] as const), // O backend usa type, não role, e em maiúsculas
  }),
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

// Interface para registro de usuário
export const registerUserSchema = z.object({
  name: z.string().optional(), // O backend tem name como opcional
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  type: z.enum(['PLAYER', 'ADMIN'] as const).optional(), // O backend usa type, não role, e é opcional
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
}).refine((data: {password: string, confirmPassword: string}) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type ConfirmPasswordReset = z.infer<typeof confirmPasswordResetSchema>; 