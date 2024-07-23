import { z } from "zod";

const emailSchema = z.string().email().min(1).max(255);
const passwordSchema = z.string().min(6).max(255);

// user registration validation
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// user login validation
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// email verification code validation
export const verificationCodeSchema = z.string().min(1).max(24);
