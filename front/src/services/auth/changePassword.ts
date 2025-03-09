import { useMutation } from '@tanstack/react-query';
import api from '../api';
import { ApiError, ChangePassword } from './auth.interfaces';

/**
 * Mutation para alterar a senha do usuário autenticado
 */
export const useChangePasswordMutation = () => {
  return useMutation<unknown, ApiError, ChangePassword>({
    mutationFn: async ({ password }) => {
      const response = await api.patch('/auth/change-password', {
        password,
      });
      
      return response.data;
    }
  });
}; 