import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setAuth: (user, token) => {
    localStorage.setItem('accessToken', token);
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ user: null, isAuthenticated: false });
  },
}));
