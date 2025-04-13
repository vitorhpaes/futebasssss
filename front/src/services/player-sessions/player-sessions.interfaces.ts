import { z } from 'zod';

// Definição do esquema de jogador em partida
export const playerSessionSchema = z.object({
  id: z.number(),
  userId: z.number(),
  sessionId: z.number(),
  teamId: z.number().nullable(),
  confirmed: z.boolean(),
  willPlay: z.boolean(),
  goals: z.number(),
  assists: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    position: z.string().nullable()
  }).optional()
});

// Lista de jogadores em partida
export const playerSessionListSchema = z.array(playerSessionSchema);

// Esquema para criar ou atualizar um jogador em partida
export const updatePlayerSessionSchema = z.object({
  teamId: z.number().optional(),
  confirmed: z.boolean().optional(),
  willPlay: z.boolean().optional(),
  goals: z.number().optional(),
  assists: z.number().optional(),
});

// Tipos inferidos dos schemas
export type PlayerSession = z.infer<typeof playerSessionSchema>;
export type PlayerSessionList = z.infer<typeof playerSessionListSchema>;
export type UpdatePlayerSessionDto = z.infer<typeof updatePlayerSessionSchema>;

export interface User {
  id: number;
  name: string;
  position?: string;
}
