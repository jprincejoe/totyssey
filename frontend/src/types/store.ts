import { ThemeSlice } from "@/stores/themeSlice";
import { UserSlice } from "@/stores/userSlice";

export type Store = UserSlice & ThemeSlice;
