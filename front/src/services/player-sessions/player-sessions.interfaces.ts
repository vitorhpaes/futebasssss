import { z } from 'zod';

// Definição do esquema de jogador em partida
export const playerSessionSchema = z.object({
  id: z.number(),
  userId: z.number(),
  sessionId: z.number(),
  teamId: z.number().optional().nullable(),
  confirmed: z.boolean(),
  isResenha: z.boolean().optional().default(false),
  goals: z.number().optional().default(0),
  assists: z.number().optional().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    position: z.string().optional().nullable()
  })
});

// Lista de jogadores em partida
export const playerSessionListSchema = z.array(playerSessionSchema);

// Esquema para criar ou atualizar um jogador em partida
export const updatePlayerSessionSchema = z.object({
  confirmed: z.boolean().optional(),
  isResenha: z.boolean().optional(),
  teamId: z.number().optional().nullable()
});

// Tipos inferidos dos schemas
export type PlayerSession = z.infer<typeof playerSessionSchema>;
export type PlayerSessionList = z.infer<typeof playerSessionListSchema>;
export type UpdatePlayerSessionDto = z.infer<typeof updatePlayerSessionSchema>; 