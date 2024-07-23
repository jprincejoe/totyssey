import { z } from "zod";
import { isValidObjectId } from "../utils/mongoDb";

const emailValidator = z.string().email().min(1).max(255);
const passwordValidator = z.string().min(6).max(255);

// user registration schema
export const registerSchema = z
  .object({
    email: emailValidator,
    password: passwordValidator,
    confirmPassword: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// user login schema
export const loginSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

// email verification code schema
export const verificationCodeSchema = z
  .string()
  .min(1)
  .max(24)
  .refine(isValidObjectId, {
    message: "Invalid verification code",
  });

// email schema
export const emailSchema = z.object({
  email: emailValidator,
});
