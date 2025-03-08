import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';
import { ApiError } from '../services/auth/auth.interfaces';

export type UserRole = 'admin' | 'player';

export interface User {
  id: number;
  name: string;
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
          
          // Faz a requisição para a API
          const response = await api.post('/auth/login', {
            email,
            password,
            role
          });
          
          // Extrai os dados da resposta
          const { user, token } = response.data;
          
          // Atualiza o estado
          set({ 
            user,
            token,
            isAuthenticated: true, 
            isLoading: false,
            redirectPath: redirectPath || (role === 'admin' ? '/admin/dashboard' : '/player/dashboard')
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
        // Faz a chamada para logout na API
        api.post('/auth/logout').catch(() => {
          // Ignora erros ao fazer logout na API
        });
        
        // Limpa o estado local independentemente da resposta da API
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