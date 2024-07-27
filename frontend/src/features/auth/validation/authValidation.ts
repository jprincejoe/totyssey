import * as z from "zod";

export const authSchema = {
  Login: z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6, { message: "Please enter a valid password" }),
  }),

  Register: z
    .object({
      firstName: z.string().min(1, { message: "First name is required" }),
      lastName: z.string().min(1, { message: "Last name is required" }),
      email: z
        .string()
        .email({ message: "Please enter a valid email address" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),

  VerificationCode: z.string().min(1).max(24),

  ForgotPassword: z.object({
    email: z.string().email({ message: "Email is required" }),
  }),

  ResetPassword: z.object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    verificationCode: z.string().min(1).max(24),
  }),

  Expiration: z.number().int().positive(),
};
