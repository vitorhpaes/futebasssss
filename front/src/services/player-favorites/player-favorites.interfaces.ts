import { z } from 'zod';

// Esquema para criar um favorito
export const createPlayerFavoriteSchema = z.object({
  sessionId: z.number(),
  voterId: z.number(),
  favoriteId: z.number(),
  teamId: z.number().optional(),
});

// Esquema do favorito
export const playerFavoriteSchema = z.object({
  id: z.number(),
  sessionId: z.number(),
  voterId: z.number(),
  favoriteId: z.number(),
  teamId: z.number().nullable(),
  createdAt: z.string(),
});

// Lista de favoritos
export const playerFavoriteListSchema = z.array(playerFavoriteSchema);

// Tipos inferidos dos schemas
export type CreatePlayerFavorite = z.infer<typeof createPlayerFavoriteSchema>;
export type PlayerFavorite = z.infer<typeof playerFavoriteSchema>;
export type PlayerFavoriteList = z.infer<typeof playerFavoriteListSchema>; 