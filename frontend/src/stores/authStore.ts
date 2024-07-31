import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TUser } from "@/features/auth/types/authTypes";
import API from "@/config/apiClient";

interface AuthState {
  user: TUser | null;
  setUser: (user: TUser) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: async () => {
      // clear user from store
      set({ user: null });

      // call logout endpoint
      await API.get("/api/v1/auth/logout");
    },
  }))
);
