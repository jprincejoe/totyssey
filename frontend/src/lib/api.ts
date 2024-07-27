import API from "@/config/apiClient";
import { ServerRoute } from "@/constants/serverRoutes";
import {
  LoginSchema,
  ForgotPasswordSchema,
  VerificationCodeSchema,
  ResetPasswordSchema,
} from "@/validation/authValidation";
import { RegisterSchema } from "@/validation/authValidation";
import { z } from "zod";

export const login = async (data: z.infer<typeof LoginSchema>) =>
  API.post(ServerRoute.Auth.LOGIN, data);

export const register = async (data: z.infer<typeof RegisterSchema>) =>
  API.post(ServerRoute.Auth.REGISTER, data);

export const verifyEmail = async (
  code: z.infer<typeof VerificationCodeSchema>
) => API.get(`${ServerRoute.Auth.VERIFY_EMAIL}/${code}`);

export const forgotPassword = async (
  data: z.infer<typeof ForgotPasswordSchema>
) => API.post(ServerRoute.Auth.FORGOT_PASSWORD, data);

export const resetPassword = async (
  data: z.infer<typeof ResetPasswordSchema>
) => API.post(ServerRoute.Auth.RESET_PASSWORD, data);
