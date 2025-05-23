import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { CreatePlayerFavorite, PlayerFavorite, PlayerFavoriteList } from './player-favorites.interfaces';
import { MATCHES_QUERY_KEYS } from '../matches/matches.queries';


// Chaves de query para o React Query
export const PLAYER_FAVORITES_QUERY_KEYS = {
  all: ['player-favorites'] as const,
  lists: () => [...PLAYER_FAVORITES_QUERY_KEYS.all, 'list'] as const,
  listBySession: (sessionId: number) => [...PLAYER_FAVORITES_QUERY_KEYS.lists(), 'session', sessionId] as const,
};

// Mutation para favoritar um jogador
export const useCreatePlayerFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePlayerFavorite) => {
      const response = await api.post<PlayerFavorite>('/player-favorites', data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidar queries relacionadas aos favoritos da sessão
      queryClient.invalidateQueries({ 
        queryKey: PLAYER_FAVORITES_QUERY_KEYS.listBySession(variables.sessionId)
      });
      queryClient.invalidateQueries({ 
        queryKey: MATCHES_QUERY_KEYS.all
      });
    }
  });
};

export const useDeletePlayerFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (favoriteId: number) => {
      const response = await api.delete<PlayerFavorite>(`/player-favorites/${favoriteId}`);
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ 
        queryKey: PLAYER_FAVORITES_QUERY_KEYS.listBySession(response.sessionId)
      });
      queryClient.invalidateQueries({ 
        queryKey: MATCHES_QUERY_KEYS.all
      });
    }
  });
};

// Query para buscar favoritos por sessão
export const useSessionFavorites = (sessionId?: number) => {
  return useQuery({
    queryKey: PLAYER_FAVORITES_QUERY_KEYS.listBySession(sessionId ?? 0),
    queryFn: async () => {
      if (!sessionId) {
        throw new Error('Session ID is required');
      }
      const response = await api.get<PlayerFavoriteList>(`/player-favorites/session/${sessionId}`);
      return response.data;
    },
    enabled: !!sessionId
  });
}; 