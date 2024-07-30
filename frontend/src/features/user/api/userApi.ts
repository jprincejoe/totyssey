import API from "@/config/apiClient";
import { ServerRoute } from "@/constants/serverRoutes";
import { TUser } from "@/features/auth/types/authTypes";

export const userApi = {
  getUser: async (): Promise<TUser> =>
    await API.get<TUser>(ServerRoute.User.BASE),
};
