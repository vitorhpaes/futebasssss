import { z } from 'zod';
import { SessionStatus } from '@futebasssss-ia/constants';

import { teamSchema } from '../teams/teams.interfaces';
import { playerSessionSchema } from '../player-sessions/player-sessions.interfaces';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface BaseTeam {
  id: number;
  name: string;
}

export interface PlayerSession {
  id: number;
  user: User;
  goals: number;
  assists: number;
  favorites?: number;
}

export interface BaseMatch {
  id: number;
  date: string;
  location: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
  notes?: string;
  playerSessions: PlayerSession[];
}

export interface MatchFilterParams {
  upcoming?: boolean;
  past?: boolean;
  status?: SessionStatus;
}

// Definição do esquema de validação para as partidas
export const matchSchema = z.object({
  id: z.number(),
  date: z.string(),
  location: z.string(),
  status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELED']),
  notes: z.string().optional(),
  playerSessions: z.array(playerSessionSchema.merge(z.object({
    favoritesCount: z.number().optional(),
  }))),
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