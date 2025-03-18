import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { handleApiError } from '../api';
import { ApiError } from '../auth/auth.interfaces';
import { 
  PlayerSession, 
  PlayerSessionList, 
  UpdatePlayerSessionDto,
  playerSessionSchema,
  playerSessionListSchema
} from './player-sessions.interfaces';
import { useUsers } from '../users/users.queries';
import React from 'react';

// Chaves de query para o React Query
export const PLAYER_SESSIONS_QUERY_KEYS = {
  all: ['player-sessions'] as const,
  lists: () => [...PLAYER_SESSIONS_QUERY_KEYS.all, 'list'] as const,
  listBySession: (sessionId: number) => [...PLAYER_SESSIONS_QUERY_KEYS.lists(), 'session', sessionId] as const,
  listByUser: (userId: number) => [...PLAYER_SESSIONS_QUERY_KEYS.lists(), 'user', userId] as const,
  details: () => [...PLAYER_SESSIONS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...PLAYER_SESSIONS_QUERY_KEYS.details(), id] as const,
};

/**
 * Hook para obter a lista de jogadores em uma partida
 */
export const usePlayerSessionsByMatch = (sessionId: number) => {
  return useQuery<PlayerSessionList, ApiError>({
    queryKey: PLAYER_SESSIONS_QUERY_KEYS.listBySession(sessionId),
    queryFn: async () => {
      try {
        const response = await api.get(`/player-sessions/session/${sessionId}`);
        try {
          return playerSessionListSchema.parse(response.data);
        } catch (parseError) {
          console.error('Erro ao validar schema:', parseError);
          return response.data as PlayerSessionList;
        }
      } catch (error) {
        throw handleApiError(error);
      }
    },
    enabled: !!sessionId
  });
};

/**
 * Hook para buscar todos os jogadores e combiná-los com os dados de presença
 * Isso permite mostrar todos os jogadores, mesmo os que ainda não têm registro na partida
 */
export const usePlayersWithSessionData = (sessionId: number) => {
  // Buscar todos os usuários (não filtramos por tipo para incluir tanto jogadores quanto admins)
  const { data: allPlayers, isLoading: isLoadingPlayers, error: playersError } = useUsers();

  // Buscar apenas os que já têm registro na partida
  const { 
    data: playerSessions, 
    isLoading: isLoadingSessions, 
    error: sessionsError 
  } = usePlayerSessionsByMatch(sessionId);

  // Combinar os resultados
  const data = React.useMemo(() => {
    if (!allPlayers) return [];

    return allPlayers.map(player => {
      // Verificar se o jogador já tem um registro na partida
      const sessionData = playerSessions?.find(ps => ps.userId === player.id);
      
      if (sessionData) {
        // Se já tem registro, retornar os dados da sessão
        return sessionData;
      } else {
        // Se não tem registro, criar um objeto com os dados básicos
        return {
          id: 0, // Id temporário
          userId: player.id,
          sessionId,
          teamId: null,
          confirmed: false,
          willPlay: true,
          goals: 0,
          assists: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          user: {
            id: player.id,
            name: player.name,
            email: player.email,
            position: player.position
          }
        } as PlayerSession;
      }
    });
  }, [allPlayers, playerSessions, sessionId]);

  return {
    data,
    isLoading: isLoadingPlayers || isLoadingSessions,
    error: playersError || sessionsError
  };
};

/**
 * Hook para atualizar um jogador em uma partida
 */
export const useUpdatePlayerSessionMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<PlayerSession, ApiError, { sessionId: number; userId: number; data: UpdatePlayerSessionDto }>({
    mutationFn: async ({ sessionId, userId, data }) => {
      try {
        console.log('⚽ Iniciando atualização de jogador com dados:', { sessionId, userId, data });
        
        // Primeiro, buscamos a sessão específica deste jogador nesta partida
        const response = await api.get(`/player-sessions/session/${sessionId}`);
        const sessions = response.data as PlayerSessionList;
        const playerSession = sessions.find(ps => ps.userId === userId);
        
        let result;
        if (playerSession) {
          // Se encontrar o registro existente, atualiza
          console.log(`⚽ Atualizando sessão existente ID: ${playerSession.id}`, { teamId: data.teamId, ...data });
          result = await api.patch(`/player-sessions/${playerSession.id}`, data);
        } else {
          // Se não encontrar, cria um novo com os dados
          console.log('⚽ Criando nova sessão', { userId, sessionId, ...data });
          result = await api.post(`/player-sessions`, {
            userId,
            sessionId,
            ...data
          });
        }
        
        console.log('⚽ Mutation bem-sucedida com variáveis:', { sessionId, userId, data });
        
        try {
          return playerSessionSchema.parse(result.data);
        } catch (parseError) {
          console.error('⚠️ Erro ao validar schema:', parseError);
          return result.data as PlayerSession;
        }
      } catch (error) {
        console.error('⚠️ Erro ao atualizar jogador:', error);
        throw handleApiError(error);
      }
    },
    onSuccess: (_, variables) => {
      // Invalidar queries para forçar o recarregamento dos dados
      console.log('✅ Mutation bem-sucedida:', variables);
      queryClient.invalidateQueries({ 
        queryKey: PLAYER_SESSIONS_QUERY_KEYS.listBySession(variables.sessionId) 
      });
    }
  });
};

/**
 * Hook para confirmar a presença de um jogador com o endpoint específico
 */
export const useConfirmPlayerMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<PlayerSession, ApiError, { sessionId: number; userId: number; willPlay?: boolean }>({
    mutationFn: async ({ sessionId, userId, willPlay }) => {
      try {
        // Verifica se já existe uma associação específica para este jogador nesta sessão
        const response = await api.get(`/player-sessions/session/${sessionId}`);
        const sessions = response.data as PlayerSessionList;
        
        // Buscar a sessão específica deste jogador nesta partida
        const playerSessionExists = sessions.find(ps => ps.userId === userId);
        
        let result;
        
        if (playerSessionExists) {
          // Se existir, atualizamos apenas o status de willPlay (para alternar entre jogo e resenha)
          result = await api.patch(`/player-sessions/${playerSessionExists.id}`, {
            confirmed: true,
            willPlay: willPlay ?? true
          });
          console.log('Atualizando sessão existente', playerSessionExists.id);
        } else {
          // Se não existir, criamos uma nova associação para este jogador
          result = await api.post(`/player-sessions`, {
            userId,
            sessionId,
            confirmed: true,
            willPlay: willPlay ?? true
          });
          console.log('Criando nova sessão para jogador', userId);
        }
        
        try {
          return playerSessionSchema.parse(result.data);
        } catch (parseError) {
          console.error('Erro ao validar schema:', parseError);
          return result.data as PlayerSession;
        }
      } catch (error) {
        console.error('Erro ao confirmar jogador:', error);
        throw handleApiError(error);
      }
    },
    onSuccess: (_, variables) => {
      // Invalidar queries para forçar o recarregamento dos dados
      queryClient.invalidateQueries({ 
        queryKey: PLAYER_SESSIONS_QUERY_KEYS.listBySession(variables.sessionId) 
      });
    }
  });
}; 