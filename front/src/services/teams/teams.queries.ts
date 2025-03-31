import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { handleApiError } from '../api';
import { ApiError } from '../auth/auth.interfaces';
import { 
  Team, 
  TeamList, 
  UpdateTeamCaptainDto,
  teamSchema,
  teamListSchema 
} from './teams.interfaces';
import { MATCHES_QUERY_KEYS } from '../matches/matches.queries';

// Chaves de query para o React Query
export const TEAMS_QUERY_KEYS = {
  all: ['teams'] as const,
  lists: () => [...TEAMS_QUERY_KEYS.all, 'list'] as const,
  list: (sessionId?: number) => [...TEAMS_QUERY_KEYS.lists(), { sessionId }] as const,
  details: () => [...TEAMS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...TEAMS_QUERY_KEYS.details(), id] as const,
};

/**
 * Hook para obter a lista de times de uma partida
 */
export const useTeams = (sessionId?: number) => {
  return useQuery<TeamList, ApiError>({
    queryKey: TEAMS_QUERY_KEYS.list(sessionId),
    queryFn: async () => {
      try {
        const endpoint = sessionId ? `/teams?sessionId=${sessionId}` : '/teams';
        const response = await api.get(endpoint);
        
        try {
          return teamListSchema.parse(response.data);
        } catch (parseError) {
          console.error('Erro ao validar schema:', parseError);
          return response.data as TeamList;
        }
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

/**
 * Hook para obter detalhes de um time específico
 */
export const useTeam = (id: number) => {
  return useQuery<Team, ApiError>({
    queryKey: TEAMS_QUERY_KEYS.detail(id),
    queryFn: async () => {
      try {
        const response = await api.get(`/teams/${id}`);
        
        try {
          return teamSchema.parse(response.data);
        } catch (parseError) {
          console.error('Erro ao validar schema:', parseError);
          return response.data as Team;
        }
      } catch (error) {
        throw handleApiError(error);
      }
    },
    enabled: !!id
  });
};

/**
 * Hook para atualizar o capitão de um time
 */
export const useUpdateTeamCaptain = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Team, ApiError, { teamId: number; data: UpdateTeamCaptainDto }>({
    mutationFn: async ({ teamId, data }) => {
      try {
        const response = await api.patch(`/teams/${teamId}/captain`, data);
        
        try {
          return teamSchema.parse(response.data);
        } catch (parseError) {
          console.error('Erro ao validar schema:', parseError);
          return response.data as Team;
        }
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: (response, variables) => {
  
      queryClient.invalidateQueries({ queryKey: TEAMS_QUERY_KEYS.detail(variables.teamId) });
      queryClient.invalidateQueries({ queryKey: TEAMS_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: MATCHES_QUERY_KEYS.detail(response.sessionId!) });
    }
  });
}; 