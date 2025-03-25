import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { 
  Match, 
  MatchList, 
  CreateMatchDto, 
  UpdateMatchDto, 
  MatchFilterParams,
  matchSchema,
  matchListSchema 
} from './matches.interfaces';
import { handleApiError } from '../api';
import { ApiError } from '../auth/auth.interfaces';
import { SessionStatus } from '@futebass-ia/constants';

// Chaves de query para o React Query
export const MATCHES_QUERY_KEYS = {
  all: ['matches'] as const,
  lists: () => [...MATCHES_QUERY_KEYS.all, 'list'] as const,
  list: (filters: MatchFilterParams) => [...MATCHES_QUERY_KEYS.lists(), { ...filters }] as const,
  details: () => [...MATCHES_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...MATCHES_QUERY_KEYS.details(), id] as const,
};

/**
 * Hook para obter a lista de partidas
 */
export const useMatches = (filters?: MatchFilterParams) => {
  return useQuery<MatchList, ApiError>({
    queryKey: MATCHES_QUERY_KEYS.list(filters || {}),
    queryFn: async () => {
      try {
        let endpoint = '/sessions';
        
        // Verificar se precisamos usar endpoints específicos
        if (filters?.upcoming) {
          endpoint = '/sessions/upcoming';
        } else if (filters?.past) {
          endpoint = '/sessions/past';
        }
        
        // Adicionar status como query param se fornecido
        const queryParams = new URLSearchParams();
        if (filters?.status) {
          queryParams.append('status', filters.status);
        }
        
        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
        
        const response = await api.get(`${endpoint}${query}`);
        
        try {
          return matchListSchema.parse(response.data);
        } catch (parseError) {
          console.error('Erro ao validar schema:', parseError);
          // Retornar os dados mesmo sem validação em caso de erro
          return response.data as MatchList;
        }
      } catch (error) {
        console.error('Erro na consulta de partidas:', error);
        throw handleApiError(error);
      }
    }
  });
};

/**
 * Hook para obter detalhes de uma partida específica
 */
export const useMatch = (id: number) => {
  return useQuery<Match, ApiError>({
    queryKey: MATCHES_QUERY_KEYS.detail(id),
    queryFn: async () => {
      try {
        const response = await api.get(`/sessions/${id}`);
        
        try {
          return matchSchema.parse(response.data);
        } catch (parseError) {
          console.error('Erro ao validar schema:', parseError);
          return response.data as Match;
        }
      } catch (error) {
        throw handleApiError(error);
      }
    },
    enabled: !!id // Só executa se o ID for válido
  });
};

/**
 * Hook para criar uma nova partida
 */
export const useCreateMatchMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Match, ApiError, CreateMatchDto>({
    mutationFn: async (data: CreateMatchDto) => {
      try {
        // Primeiro, cria a sessão (partida)
        const sessionResponse = await api.post('/sessions', {
          date: data.date,
          location: data.location,
          status: SessionStatus.SCHEDULED,
          notes: data.notes
        });
        
        // Depois, cria o time A com o sessionId
        const teamAResponse = await api.post('/teams', {
          name: data.teamAName,
          color: data.teamAColor || 'Azul',
          sessionId: sessionResponse.data.id
        });
        
        // Depois, cria o time B com o sessionId
        const teamBResponse = await api.post('/teams', {
          name: data.teamBName,
          color: data.teamBColor || 'Vermelho',
          sessionId: sessionResponse.data.id
        });
        
        // Combina os dados para retornar
        const result = {
          ...sessionResponse.data,
          teamA: teamAResponse.data,
          teamB: teamBResponse.data
        };
        
        // Valida e retorna
        try {
          return matchSchema.parse(result);
        } catch (parseError) {
          console.error('Erro ao validar schema do resultado:', parseError);
          return result as Match;
        }
      } catch (error) {
        console.error('Erro ao criar partida:', error);
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      // Invalidar queries para forçar o recarregamento dos dados
      queryClient.invalidateQueries({ queryKey: MATCHES_QUERY_KEYS.lists() });
    }
  });
};

/**
 * Hook para atualizar uma partida existente
 */
export const useUpdateMatchMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Match, ApiError, { id: number; data: UpdateMatchDto }>({
    mutationFn: async ({ id, data }) => {
      try {
        const response = await api.patch(`/sessions/${id}`, data);
        
        try {
          return matchSchema.parse(response.data);
        } catch (parseError) {
          console.error('Erro ao validar schema:', parseError);
          return response.data as Match;
        }
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: (_, variables) => {
      // Invalidar queries para forçar o recarregamento dos dados
      queryClient.invalidateQueries({ queryKey: MATCHES_QUERY_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: MATCHES_QUERY_KEYS.lists() });
    }
  });
};

/**
 * Hook para excluir uma partida
 */
export const useDeleteMatchMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, ApiError, number>({
    mutationFn: async (id: number) => {
      try {
        await api.delete(`/sessions/${id}`);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      // Invalidar queries para forçar o recarregamento dos dados
      queryClient.invalidateQueries({ queryKey: MATCHES_QUERY_KEYS.lists() });
    }
  });
};

/**
 * Hook para restaurar uma partida excluída logicamente
 */
export const useRestoreMatchMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Match, ApiError, number>({
    mutationFn: async (id: number) => {
      try {
        const response = await api.patch(`/sessions/${id}/restore`);
        return matchSchema.parse(response.data);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: (_, id) => {
      // Invalidar queries para forçar o recarregamento dos dados
      queryClient.invalidateQueries({ queryKey: MATCHES_QUERY_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: MATCHES_QUERY_KEYS.lists() });
    }
  });
};

/**
 * Hook para excluir permanentemente uma partida
 */
export const usePermanentDeleteMatchMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, ApiError, number>({
    mutationFn: async (id: number) => {
      try {
        await api.delete(`/sessions/${id}/permanent`);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      // Invalidar queries para forçar o recarregamento dos dados
      queryClient.invalidateQueries({ queryKey: MATCHES_QUERY_KEYS.lists() });
    }
  });
}; 