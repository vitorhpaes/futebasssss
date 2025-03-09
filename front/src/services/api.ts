import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from '../context/authStore';
import { apiErrorSchema, ApiError } from './auth/auth.interfaces';

// Configuração base para o cliente Axios
const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Importante para CORS com credenciais
};

// Criando a instância do Axios
const api: AxiosInstance = axios.create(config);

// Handler genérico de erros para padronizar o tratamento
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    
    // Para erros de CORS ou conexão
    if (!axiosError.response) {
      return {
        statusCode: 0,
        message: 'Erro de conexão com o servidor. Verifique sua conexão ou se o servidor está rodando.',
        error: 'Network Error'
      };
    }
    
    // Tenta validar a resposta de erro usando o schema
    try {
      const errorData = axiosError.response?.data;
      const validatedError = apiErrorSchema.parse(errorData);
      return validatedError;
    } catch {
      // Caso não consiga validar, retorna um erro padrão
      return {
        statusCode: axiosError.response?.status || 500,
        message: axiosError.message || 'Erro desconhecido',
        error: 'Erro na requisição'
      };
    }
  }
  
  // Para outros tipos de erro
  return {
    statusCode: 500,
    message: error instanceof Error ? error.message : 'Erro desconhecido',
    error: 'Erro inesperado'
  };
};

// Interceptador de requisições
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação nas requisições, se disponível
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(handleApiError(error));
  }
);

// Interceptador de respostas
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const handledError = handleApiError(error);
    const originalRequest = error.config;
    
    // Verificar se é erro 401 (não autorizado) e não é uma tentativa de login
    if (handledError.statusCode === 401 && 
        !originalRequest._retry && 
        !originalRequest.url?.includes('auth/login')) {
      
      // Forçar logout quando o token expirar ou for inválido
      useAuthStore.getState().logout();
      
      // Redirecionar para página de login
      window.location.href = '/auth/login';
    }
    
    return Promise.reject(handledError);
  }
);

export default api; 