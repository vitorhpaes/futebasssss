import { useMutation } from '@tanstack/react-query';
import api from '../api';
import { useAuthStore, UserRole } from '../../context/authStore';
import { 
  LoginCredentials, 
  LoginResponse, 
  loginResponseSchema,
  ApiError
} from './auth.interfaces';

/**
 * Mutation para fazer login de usuário
 * Retorna uma função que recebe as credenciais e faz a chamada à API
 */
export const useLoginMutation = () => {
  const { login: storeLogin } = useAuthStore();

  return useMutation<
    LoginResponse,
    ApiError,
    { credentials: Omit<LoginCredentials, 'role'> & { role: UserRole }, redirectPath?: string }
  >({
    mutationFn: async ({ credentials, redirectPath }) => {
      const { email, password, role: _ } = credentials;
      
      // O backend espera apenas email e password no login
      const response = await api.post<LoginResponse>('/auth/login', { 
        email, 
        password
      });
      
      // Valida a resposta usando o schema
      const validatedData = loginResponseSchema.parse(response.data);
      
      // Convertendo tipo de usuário do backend para o formato do frontend
      const userRole: UserRole = validatedData.user.type === 'ADMIN' ? 'admin' : 'player';
      
      // Atualiza o estado global com os dados do usuário e token
      await storeLogin(
        email, 
        password, 
        userRole, 
        redirectPath
      );
      
      return validatedData;
    }
  });
};

/**
 * Mutation para fazer logout de usuário
 * Nota: O backend parece não ter um endpoint específico para logout.
 * Neste caso, apenas limpamos o estado local.
 */
export const useLogoutMutation = () => {
  const { logout } = useAuthStore();

  return useMutation<void, ApiError>({
    mutationFn: async () => {
      // O backend não tem um endpoint de logout explícito, então apenas limpamos o estado local
      logout();
    }
  });
};

/**
 * Mutation para registrar um novo usuário
 */
export const useRegisterMutation = () => {
  return useMutation<any, ApiError, { email: string; password: string; name?: string; type?: 'PLAYER' | 'ADMIN' }>({
    mutationFn: async ({ email, password, name, type }) => {
      const response = await api.post('/auth/register', {
        email,
        password,
        name,
        type: type || 'PLAYER'
      });
      
      return response.data;
    }
  });
};

/**
 * Hook personalizado que combina a validação do Zod com a mutation do React Query
 * para fazer login e tratar erros comuns
 */
export const useLogin = () => {
  const loginMutation = useLoginMutation();
  
  const handleLogin = async (
    email: string, 
    password: string, 
    role: UserRole,
    redirectPath?: string
  ) => {
    try {
      // Cria o objeto de credenciais
      const credentials = {
        email,
        password,
        role
      };
      
      // Executa a mutation
      await loginMutation.mutateAsync({ 
        credentials,
        redirectPath
      });
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { 
        success: false,
        error: error as ApiError
      };
    }
  };
  
  return {
    login: handleLogin,
    isLoading: loginMutation.isPending,
    error: loginMutation.error
  };
}; 