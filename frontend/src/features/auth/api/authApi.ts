import API from "@/config/apiClient";
import { ServerRoute } from "@/constants/serverRoutes";
import { z } from "zod";
import { authSchema } from "../validation/authValidation";
import { TUser } from "../types/authTypes";

export const authApi = {
  login: async (data: z.infer<typeof authSchema.Login>): Promise<TUser> =>
    await API.post<TUser>(ServerRoute.Auth.LOGIN, data),

  register: async (data: z.infer<typeof authSchema.Register>) =>
    await API.post(ServerRoute.Auth.REGISTER, data),

  verifyEmail: async (code: z.infer<typeof authSchema.VerificationCode>) =>
    await API.get(`${ServerRoute.Auth.VERIFY_EMAIL}/${code}`),

  forgotPassword: async (data: z.infer<typeof authSchema.ForgotPassword>) =>
    await API.post(ServerRoute.Auth.FORGOT_PASSWORD, data),

  resetPassword: async (data: z.infer<typeof authSchema.ResetPassword>) =>
    await API.post(ServerRoute.Auth.RESET_PASSWORD, data),

  logout: async () => await API.get(ServerRoute.Auth.LOGOUT),
};
