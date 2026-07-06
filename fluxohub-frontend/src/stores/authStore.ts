import { create } from "zustand";
import type { User } from "@/types/auth";

interface AuthState {
  // O Access Token fica estritamente na memória, blindando contra XSS que ataque o localStorage
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Usado durante a verificação inicial do cookie (Hydration)

  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  // Começamos como true pois na montagem o apiClient tentará o refresh silencioso
  isLoading: true, 

  setAuth: (token, user) => set({ accessToken: token, user, isAuthenticated: true, isLoading: false }),
  clearAuth: () => set({ accessToken: null, user: null, isAuthenticated: false, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
