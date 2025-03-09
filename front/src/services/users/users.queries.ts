import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { 
  User, 
  UserList, 
  RegisterUserDto, 
  UpdateUserDto, 
  UserFilterParams,
  userSchema,
  userListSchema 
} from './users.interfaces';
import { handleApiError } from '../api';
import { ApiError } from '../auth/auth.interfaces';

// Chaves de query para o React Query
export const USERS_QUERY_KEYS = {
  all: ['users'] as const,
  lists: () => [...USERS_QUERY_KEYS.all, 'list'] as const,
  list: (filters: UserFilterParams) => [...USERS_QUERY_KEYS.lists(), { ...filters }] as const,
  details: () => [...USERS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...USERS_QUERY_KEYS.details(), id] as const,
};

/**
 * Hook para obter a lista de usuários
 */
export const useUsers = (filters?: UserFilterParams) => {
  return useQuery<UserList, ApiError>({
    queryKey: USERS_QUERY_KEYS.list(filters || {}),
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams();
        
        if (filters?.name) queryParams.append('name', filters.name);
        if (filters?.position) queryParams.append('position', filters.position);
        if (filters?.type) queryParams.append('type', filters.type);
        if (filters?.orderBy) queryParams.append('orderBy', filters.orderBy);
        if (filters?.orderDirection) queryParams.append('orderDirection', filters.orderDirection);
        
        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
        console.log('Fazendo requisição para:', `/users${query}`);
        const response = await api.get(`/users${query}`);
        console.log('Resposta recebida:', response.data);
        
        try {
          return userListSchema.parse(response.data);
        } catch (parseError) {
          console.error('Erro ao validar schema:', parseError);
          // Retornar os dados mesmo sem validação em caso de erro
          return response.data as UserList;
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw handleApiError(error);
      }
    }
  });
};

/**
 * Hook para obter um usuário específico pelo ID
 */
export const useUser = (id: number) => {
  return useQuery<User, ApiError>({
    queryKey: USERS_QUERY_KEYS.detail(id),
    queryFn: async () => {
      try {
        const response = await api.get(`/users/${id}`);
        return userSchema.parse(response.data);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    enabled: !!id
  });
};

/**
 * Hook para criar um novo usuário
 */
export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<User, ApiError, RegisterUserDto>({
    mutationFn: async (userData) => {
      try {
        const response = await api.post('/auth/register', userData);
        return userSchema.parse(response.data);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      // Invalidar lista de usuários para forçar uma nova requisição
      queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEYS.lists()
      });
    }
  });
};

/**
 * Hook para atualizar um usuário existente
 */
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<User, ApiError, { id: number; data: UpdateUserDto }>({
    mutationFn: async ({ id, data }) => {
      try {
        const response = await api.patch(`/users/${id}`, data);
        return userSchema.parse(response.data);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: (data, variables) => {
      // Atualizar os dados em cache
      queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEYS.detail(variables.id)
      });
      queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEYS.lists()
      });
    }
  });
};

/**
 * Hook para excluir um usuário
 */
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<User, ApiError, number>({
    mutationFn: async (id) => {
      try {
        const response = await api.delete(`/users/${id}`);
        return userSchema.parse(response.data);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: (_, id) => {
      // Atualizar os dados em cache
      queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEYS.lists()
      });
      queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEYS.detail(id)
      });
    }
  });
};