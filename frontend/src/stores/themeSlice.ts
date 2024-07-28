import { Theme } from "@/enums/theme";
import { StateCreator } from "zustand";

type State = {
  theme: Theme;
};

type Action = {
  setTheme: (theme: Theme) => void;
};

export type ThemeSlice = State & Action;

export const createThemeSlice: StateCreator<
  ThemeSlice,
  [["zustand/immer", never]],
  [],
  ThemeSlice
> = (set) => ({
  theme: Theme.light,
  setTheme: (theme) =>
    set((state) => {
      state.theme = theme;
    }),
});
