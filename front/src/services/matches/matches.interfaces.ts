import { z } from 'zod';
import { SessionStatus } from '@futebasssss-ia/constants';

import { teamSchema } from '../teams/teams.interfaces';


// Definição do esquema de validação para as partidas
export const matchSchema = z.object({
  id: z.number(),
  date: z.string(),
  location: z.string(),
  status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELED']),
  notes: z.string().optional(),
  gameResult: z.object({
    id: z.number(),
    teamA: z.object({
      id: z.number(),
      name: z.string(),
    }),
    teamB: z.object({
      id: z.number(),
      name: z.string(),
    }),
    teamAScore: z.number(),
    teamBScore: z.number(),
  }).optional(),
  playerSessions: z.array(z.object({
    id: z.number(),
    statsSubmitted: z.boolean(),
    favoritesCount: z.number(),
    user: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
    goals: z.number(),
    assists: z.number(),
    favorites: z.number().optional(),
  })),
  teams: z.array(teamSchema).optional(),
});

// Definição do esquema de validação para listas de partidas
export const matchListSchema = z.array(matchSchema);

// Definição do esquema de validação para criação de partidas
export const createMatchSchema = z.object({
  date: z.string(),
  location: z.string(),
  notes: z.string().optional(),
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