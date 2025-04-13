import { z } from 'zod';

// Definição do esquema de validação para os times
export const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  sessionId: z.number().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
  captainId: z.number().nullable(),
  captain: z
    .object({
      id: z.number(),
      user: z.object({
        id: z.number(),
        name: z.string(),
      }),
    })
    .nullable(),
});

export const teamListSchema = z.array(teamSchema);

// Tipos inferidos a partir dos schemas
export type Team = z.infer<typeof teamSchema>;
export type TeamList = z.infer<typeof teamListSchema>;

// DTOs
export interface UpdateTeamCaptainDto {
  playerSessionId: number;
} 