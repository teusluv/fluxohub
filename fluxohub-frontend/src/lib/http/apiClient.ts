import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  withCredentials: true, // CRÍTICO: Permite o envio automático do cookie HttpOnly de Refresh Token
});

// INJETAR O ACCESS TOKEN DA MEMÓRIA
apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// INTERCEPTOR PARA REFRESH SILENCIOSO NO ERRO 401
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token!);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se tomou 401 e não é uma tentativa de retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Enfileira requisições concorrentes enquanto o refresh rola
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Rota protegida por cookie. O cookie fluxohub_refresh_token vai automaticamente no POST.
        const response = await axios.post(
          `${apiClient.defaults.baseURL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = response.data.accessToken;
        const { setAuth, user } = useAuthStore.getState();
        setAuth(newToken, user!); // Atualiza a store em memória

        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        return apiClient(originalRequest); // Refaz a request original que falhou
      } catch (refreshError) {
        // O Refresh Token expirou ou foi revogado. O usuário deve logar novamente.
        processQueue(refreshError, null);
        useAuthStore.getState().clearAuth();
        window.location.href = '/login?session=expired';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
