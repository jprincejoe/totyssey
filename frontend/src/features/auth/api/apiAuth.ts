import API from "@/config/apiClient";
import { ServerRoute } from "@/constants/serverRoutes";
import {
  LoginSchema,
  ForgotPasswordSchema,
  VerificationCodeSchema,
  ResetPasswordSchema,
  RegisterSchema,
} from "@/features/auth/validation/authValidation";
import { z } from "zod";

export const loginMutationApi = async (data: z.infer<typeof LoginSchema>) =>
  API.post(ServerRoute.Auth.LOGIN, data);

export const registerMutationApi = async (
  data: z.infer<typeof RegisterSchema>
) => API.post(ServerRoute.Auth.REGISTER, data);

export const verifyEmailQueryApi = async (
  code: z.infer<typeof VerificationCodeSchema>
) => API.get(`${ServerRoute.Auth.VERIFY_EMAIL}/${code}`);

export const forgotPasswordMutationApi = async (
  data: z.infer<typeof ForgotPasswordSchema>
) => API.post(ServerRoute.Auth.FORGOT_PASSWORD, data);

export const resetPasswordMutationApi = async (
  data: z.infer<typeof ResetPasswordSchema>
) => API.post(ServerRoute.Auth.RESET_PASSWORD, data);
