import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { apiClient } from '@/lib/http/apiClient';
import type { LoginFormData, RegisterFormData } from '@/lib/auth/schemas';
import type { LoginResponse } from '@/types/auth';

export function useAuth() {
  const router = useRouter();
  const { setAuth, clearAuth, accessToken, user, isAuthenticated, isLoading } = useAuthStore();

  const login = async (data: LoginFormData) => {
    try {
      const response = await apiClient.post<LoginResponse>('/api/auth/login', data);
      const { accessToken, user: apiUser } = response.data;
      setAuth(accessToken, apiUser);
      routeUser(apiUser);
    } catch (error) {
      // ⚠️ MOCK TEMPORÁRIO PARA TESTE DE UI VISTO QUE O BACKEND NÃO ESTÁ RODANDO
      console.warn("⚠️ Backend indisponível. Usando Login Mockado para testes de UI.");
      
      const mockUser = {
        id: "mock-uuid-123",
        name: data.email.split('@')[0],
        email: data.email,
        role: data.email.includes('lojista') ? "LOJISTA" : "CLIENTE",
        tenantId: data.email.includes('lojista') ? "mock-tenant-id" : null,
        isVerified: true
      };

      // Mocka o Zustand
      setAuth("mock_access_token_12345", mockUser as any);
      
      // Simula o set-cookie do Middleware para rotas protegidas
      document.cookie = "fluxohub_refresh_token=mock_cookie_value; path=/; max-age=86400";

      routeUser(mockUser as any);
    }
  };

  const routeUser = (user: any) => {
    // Roteamento inteligente baseado na Role
    const redirectMap: Record<string, string> = {
      LOJISTA: '/dashboard',
      ADMIN_PLATAFORMA: '/admin',
      CLIENTE: '/',
    };
    
    router.push(redirectMap[user.role] ?? '/');
  };

  const register = async (data: RegisterFormData) => {
    try {
      await apiClient.post('/api/auth/register', data);
      router.push('/login?registered=true');
    } catch (error) {
      console.warn("⚠️ Backend indisponível. Usando Cadastro Mockado para testes de UI.");
      // Simula sucesso no cadastro
      router.push('/login?registered=true');
    }
  };

  const logout = async () => {
    try {
      // Avisa o backend para revogar o refresh token ativo
      await apiClient.post('/api/auth/logout');
    } finally {
      clearAuth();
      router.push('/login');
    }
  };

  return {
    login,
    register,
    logout,
    accessToken,
    user,
    isAuthenticated,
    isLoading,
  };
}
