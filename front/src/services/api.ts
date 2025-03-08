import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '../context/authStore';

// Configuração base para o cliente Axios
const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Criando a instância do Axios
const api: AxiosInstance = axios.create(config);

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
    return Promise.reject(error);
  }
);

// Interceptador de respostas
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Verificar se é erro 401 (não autorizado) e não é uma tentativa de login
    if (error.response?.status === 401 && 
        !originalRequest._retry && 
        !originalRequest.url?.includes('login')) {
      
      // Forçar logout quando o token expirar ou for inválido
      useAuthStore.getState().logout();
      
      // Redirecionar para página de login (será implementado nas rotas)
      window.location.href = '/auth/login';
    }
    
    return Promise.reject(error);
  }
);

export default api; 