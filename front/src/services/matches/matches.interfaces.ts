import { z } from 'zod';
import { SessionStatus } from '@futebass-ia/constants';
import { playerSessionSchema } from '../player-sessions/player-sessions.interfaces';

// Definição do esquema de validação para os times
export const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string().optional(),
  sessionId: z.number()
});

// Definição do esquema de validação para as partidas
export const matchSchema = z.object({
  id: z.number(),
  date: z.string(),
  location: z.string(),
  status: z.nativeEnum(SessionStatus),
  notes: z.string().optional().nullable(),
  teams: z.array(teamSchema),
  playerSessions: z.array(playerSessionSchema)
});

// Definição do esquema de validação para listas de partidas
export const matchListSchema = z.array(matchSchema);

// Definição do esquema de validação para criação de partidas
export const createMatchSchema = z.object({
  date: z.string(),
  location: z.string(),
  notes: z.string().optional(),
  teamAName: z.string(),
  teamBName: z.string()
});

// Definição do esquema de validação para atualização de partidas
export const updateMatchSchema = z.object({
  date: z.string().optional(),
  location: z.string().optional(),
  status: z.nativeEnum(SessionStatus).optional(),
  notes: z.string().optional()
});

// Tipos inferidos a partir dos schemas
export type Team = z.infer<typeof teamSchema>;
export type Match = z.infer<typeof matchSchema>;
export type MatchList = z.infer<typeof matchListSchema>;
export type CreateMatchDto = z.infer<typeof createMatchSchema>;
export type UpdateMatchDto = z.infer<typeof updateMatchSchema>;

// Parâmetros de filtro para lista de partidas
export interface MatchFilterParams {
  status?: SessionStatus;
  upcoming?: boolean;
  past?: boolean;
} 