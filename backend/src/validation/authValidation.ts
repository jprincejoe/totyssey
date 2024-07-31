import { z } from "zod";
import { isValidObjectId } from "../utils/mongoDb";

//#region  Validators

const nameValidator = z.string().min(1).max(255);
const emailValidator = z.string().email().min(1).max(255);
const passwordValidator = z.string().min(6).max(255);
const verificationCodeValidator = z
  .string()
  .min(1)
  .max(24)
  .refine(isValidObjectId, {
    message: "Invalid verification code",
  });

//#endregion

//#region  Schemas

// user registration schema
export const registerSchema = z
  .object({
    firstName: nameValidator,
    lastName: nameValidator,
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

export const verificationCodeSchema = verificationCodeValidator;

// email schema
export const emailSchema = z.object({
  email: emailValidator,
});

export const resetPasswordSchema = z.object({
  password: passwordValidator,
  verificationCode: verificationCodeValidator,
});

//#endregion
