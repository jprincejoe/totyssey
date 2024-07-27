import { z } from "zod";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "../validation/authValidation";

export type TRegister = z.infer<typeof RegisterSchema>;
export type TLogin = z.infer<typeof LoginSchema>;
export type TForgotPassword = z.infer<typeof ForgotPasswordSchema>;
export type TResetPassword = z.infer<typeof ResetPasswordSchema>;
