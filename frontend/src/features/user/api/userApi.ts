import API from "@/config/apiClient";
import { TUser } from "@/features/auth/types/authTypes";

export const userApi = {
  getUser: async (): Promise<TUser> => await API.get<TUser>("/api/v1/user"),
};
