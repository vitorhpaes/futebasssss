import { z } from 'zod';

// Schema para tipo de usuário
const userTypeSchema = z.enum(['PLAYER', 'ADMIN']);

// Schema para posição
const positionSchema = z.enum(['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD']);

// Schema para usuário
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  type: userTypeSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  phone: z.string().optional().nullable(),
  position: positionSchema.optional().nullable(),
  observations: z.string().optional().nullable(),
});

// Schema para listagem de usuários
export const userListSchema = z.array(userSchema);

// Schema para registro de usuário
export const registerUserSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .nonempty('Email é obrigatório')
    .trim(),
  name: z.string()
    .nonempty('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .trim(),
  password: z.string()
    .optional()
    .transform(val => val === '' ? undefined : val),
  type: userTypeSchema.default('PLAYER'),
  phone: z.string()
    .optional()
    .transform(val => val === '' ? null : val),
  position: positionSchema
    .nullable()
    .optional()
    // @ts-expect-error O valor pode vir como string vazia do formulário
    .transform(val => val === '' ? null : val),
  observations: z.string()
    .nullable()
    .optional()
    .transform(val => val === '' ? null : val)
});

// Schema para atualização de usuário
export const updateUserSchema = z.object({
  email: z.string().email('Email inválido').optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  position: positionSchema.optional().nullable(),
  observations: z.string().optional().nullable()
});

// Schema para filtros de usuário
export const userFilterSchema = z.object({
  name: z.string().optional(),
  position: z.union([z.literal(''), positionSchema]).optional(),
  type: z.union([z.literal(''), userTypeSchema]).optional(),
  orderBy: z.string().optional(),
  orderDirection: z.union([z.literal('asc'), z.literal('desc')]).optional()
});

// Tipos extraídos dos schemas
export type User = z.infer<typeof userSchema>;
export type UserList = z.infer<typeof userListSchema>;
export type RegisterUserDto = z.infer<typeof registerUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type UserFilterParams = z.infer<typeof userFilterSchema>; 