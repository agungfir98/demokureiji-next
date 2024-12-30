import { create } from "zustand";
type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  setToken: (token) => set({ isAuthenticated: !!token, token }),
}));

export default useAuthStore;
