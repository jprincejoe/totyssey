import API from "@/config/apiClient";
import { ServerRoute } from "@/constants/serverRoutes";
import { z } from "zod";
import { authSchema } from "../validation/authValidation";

export const authApi = {
  login: async (data: z.infer<typeof authSchema.Login>) =>
    API.post(ServerRoute.Auth.LOGIN, data),

  register: async (data: z.infer<typeof authSchema.Register>) =>
    API.post(ServerRoute.Auth.REGISTER, data),

  verifyEmail: async (code: z.infer<typeof authSchema.VerificationCode>) =>
    API.get(`${ServerRoute.Auth.VERIFY_EMAIL}/${code}`),

  forgotPassword: async (data: z.infer<typeof authSchema.ForgotPassword>) =>
    API.post(ServerRoute.Auth.FORGOT_PASSWORD, data),

  resetPassword: async (data: z.infer<typeof authSchema.ResetPassword>) =>
    API.post(ServerRoute.Auth.RESET_PASSWORD, data),

  getUser: async () => API.get(ServerRoute.User.BASE),
};
