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
    { credentials: LoginCredentials, redirectPath?: string }
  >({
    mutationFn: async ({ credentials, redirectPath }) => {
      const { email, password, role } = credentials;
      
      // Faz a requisição à API
      const response = await api.post<LoginResponse>('/auth/login', { 
        email, 
        password,
        role 
      });
      
      // Valida a resposta usando o schema
      const validatedData = loginResponseSchema.parse(response.data);
      
      // Atualiza o estado global com os dados do usuário e token
      await storeLogin(email, password, role as UserRole, redirectPath);
      
      return validatedData;
    }
  });
};

/**
 * Mutation para fazer logout de usuário
 */
export const useLogoutMutation = () => {
  const { logout } = useAuthStore();

  return useMutation<void, ApiError>({
    mutationFn: async () => {
      try {
        // Tenta fazer logout no servidor (invalidar token)
        await api.post('/auth/logout');
      } finally {
        // Independente da resposta, limpa o estado local
        logout();
      }
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
      const credentials: LoginCredentials = {
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