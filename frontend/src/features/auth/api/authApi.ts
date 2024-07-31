import API from "@/config/apiClient";
import { z } from "zod";
import { authSchema } from "../validation/authValidation";
import { TUser } from "../types/authTypes";

const baseUrl = "/api/v1/auth";

export const authApi = {
  login: async (data: z.infer<typeof authSchema.Login>): Promise<TUser> =>
    await API.post<TUser>(`${baseUrl}/login`, data),

  register: async (data: z.infer<typeof authSchema.Register>) =>
    await API.post(`${baseUrl}/register`, data),

  verifyEmail: async (code: z.infer<typeof authSchema.VerificationCode>) =>
    await API.get(`${baseUrl}/email/verify/${code}`),

  forgotPassword: async (data: z.infer<typeof authSchema.ForgotPassword>) =>
    await API.post(`${baseUrl}/password/forgot`, data),

  resetPassword: async (data: z.infer<typeof authSchema.ResetPassword>) =>
    await API.post(`${baseUrl}/password/reset`, data),

  logout: async () => await API.get(`${baseUrl}/logout`),
};
