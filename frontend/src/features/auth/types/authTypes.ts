import { z } from "zod";
import { authSchema } from "../validation/authValidation";

export type TRegister = z.infer<typeof authSchema.Register>;
export type TLogin = z.infer<typeof authSchema.Login>;
export type TForgotPassword = z.infer<typeof authSchema.ForgotPassword>;
export type TResetPassword = z.infer<typeof authSchema.ResetPassword>;
