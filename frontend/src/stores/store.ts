import { Store } from "@/types/store";
import { create } from "zustand";
import { createUserSlice } from "./userSlice";
import { immer } from "zustand/middleware/immer";
import { createThemeSlice } from "./themeSlice";

export const useStore = create<Store>()(
  immer((...a) => ({
    ...createUserSlice(...a),
    ...createThemeSlice(...a),
  }))
);
