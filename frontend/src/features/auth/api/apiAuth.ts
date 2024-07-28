import API from "@/config/apiClient";
import { ServerRoute } from "@/constants/serverRoutes";
import { z } from "zod";
import { authSchema } from "../validation/authValidation";
import { TUser } from "@/types/userType";

export const authApi = {
  login: async (data: z.infer<typeof authSchema.Login>): Promise<TUser> => {
    const response = await API.post<TUser>(ServerRoute.Auth.LOGIN, data);
    return response;
  },

  register: async (data: z.infer<typeof authSchema.Register>) =>
    API.post(ServerRoute.Auth.REGISTER, data),

  verifyEmail: async (code: z.infer<typeof authSchema.VerificationCode>) =>
    API.get(`${ServerRoute.Auth.VERIFY_EMAIL}/${code}`),

  forgotPassword: async (data: z.infer<typeof authSchema.ForgotPassword>) =>
    API.post(ServerRoute.Auth.FORGOT_PASSWORD, data),

  resetPassword: async (data: z.infer<typeof authSchema.ResetPassword>) =>
    API.post(ServerRoute.Auth.RESET_PASSWORD, data),

  // getUser: async () => API.get(ServerRoute.User.BASE),
  // getUser: async () => {
  //   const response = await API.get(ServerRoute.User.BASE);
  //   console.log("API RESPONSE:", response);
  //   return response;
  // },
  // Define a function to get the user
};
