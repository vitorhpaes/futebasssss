import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';
import { ApiError } from '../services/auth/auth.interfaces';

// Tipo de usuário no frontend (camelCase para padronização)
export type UserRole = 'admin' | 'player';

// Tipo de usuário no backend (enum em UPPERCASE)
export type BackendUserType = 'ADMIN' | 'PLAYER';

// Mapeia tipo do backend para o frontend
export const mapBackendTypeToUserRole = (type: BackendUserType): UserRole => {
  return type === 'ADMIN' ? 'admin' : 'player';
};

// Mapeia tipo do frontend para o backend
export const mapUserRoleToBackendType = (role: UserRole): BackendUserType => {
  return role === 'admin' ? 'ADMIN' : 'PLAYER';
};

export interface User {
  id: number;
  name: string | null;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  redirectPath: string | null;
  login: (email: string, password: string, role: UserRole, redirectPath?: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      redirectPath: null,
      
      login: async (email: string, password: string, role: UserRole, redirectPath?: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Faz a requisição para a API (sem enviar role/type)
          const response = await api.post('/auth/login', {
            email,
            password
          });
          
          // Extrai os dados da resposta
          const { user: backendUser, access_token } = response.data;
          
          // Converte o tipo do usuário para o formato do frontend
          const userRole = mapBackendTypeToUserRole(backendUser.type);
          
          // Monta o objeto de usuário para o frontend
          const user: User = {
            id: backendUser.id,
            name: backendUser.name,
            email: backendUser.email,
            role: userRole,
          };
          
          // Atualiza o estado
          set({ 
            user,
            token: access_token,
            isAuthenticated: true, 
            isLoading: false,
            redirectPath: redirectPath || (userRole === 'admin' ? '/admin/dashboard' : '/player/dashboard')
          });
        } catch (error) {
          // Trata erros da API
          const apiError = error as ApiError;
          set({ 
            error: apiError.message || 'Erro ao fazer login. Tente novamente.', 
            isLoading: false 
          });
          throw apiError;
        }
      },
      
      logout: () => {
        // Limpa o estado local
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          redirectPath: null
        });
      },
      
      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage', // nome para o localStorage
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
); 