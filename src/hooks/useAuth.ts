import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      setToken: (token) => set({ isAuthenticated: !!token, token }),
    }),
    { name: "authStore", partialize: (state) => ({ token: state.token }) }
  )
);

export default useAuthStore;
