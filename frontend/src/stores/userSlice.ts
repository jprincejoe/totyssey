import { TUser } from "@/features/auth/types/authTypes";
import { StateCreator } from "zustand";

type State = {
  user: TUser | null;
};

type Action = {
  setUser: (user: TUser | null) => void;
};

export type UserSlice = State & Action;

export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  user: null,
  setUser: (user) =>
    set((state) => {
      state.user = user;
    }),
});
