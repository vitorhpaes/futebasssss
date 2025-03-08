import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  login: (email: string, password: string, role: UserRole) => Promise<void>;
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
      
      login: async (email: string, password: string, role: UserRole) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulando uma requisição de API (será substituído futuramente)
          // Na implementação real, você chamará a API do seu backend
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (email === 'admin@example.com' && password === 'password' && role === 'admin') {
            const fakeUser: User = {
              id: 1,
              name: 'Admin',
              email: 'admin@example.com',
              role: 'admin'
            };
            const fakeToken = 'fake-jwt-token-for-admin';
            
            set({ 
              user: fakeUser, 
              token: fakeToken, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else if (email === 'player@example.com' && password === 'password' && role === 'player') {
            const fakeUser: User = {
              id: 2,
              name: 'Player',
              email: 'player@example.com',
              role: 'player'
            };
            const fakeToken = 'fake-jwt-token-for-player';
            
            set({ 
              user: fakeUser, 
              token: fakeToken, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            set({ 
              error: 'Credenciais inválidas', 
              isLoading: false 
            });
          }
        } catch {
          set({ 
            error: 'Erro ao fazer login. Tente novamente.', 
            isLoading: false 
          });
        }
      },
      
      logout: () => {
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
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