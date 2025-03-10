import { z } from 'zod';
import { Position, UserType } from '@futebass-ia/constants';

// Schema para tipo de usuário baseado nos enumeradores do pacote de constantes
const userTypeSchema = z.nativeEnum(UserType);

// Schema para posição baseado nos enumeradores do pacote de constantes  
const positionSchema = z.nativeEnum(Position);

// Schema para usuário
export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  type: userTypeSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  phone: z.string().optional().nullable(),
  position: z.union([positionSchema, z.string(), z.null()]).optional(),
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
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  password: z.string()
    .nonempty('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres')
    .optional()
    .transform(val => val === '' ? undefined : val),
  type: z.nativeEnum(UserType).default(UserType.PLAYER),
  phone: z.string()
    .optional()
    .transform(val => val === '' ? null : val),
  position: z.union([positionSchema, z.string(), z.null()]).optional(),
  observations: z.string()
    .optional()
    .transform(val => val === '' ? null : val),
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