import EnvironmentType from "./environmentTypes";

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Missing environment variable ${key}`);
  }

  return value;
};

// Environment
export const NODE_ENV = getEnv("NODE_ENV", EnvironmentType.DEVELOPMENT);
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const PORT = getEnv("PORT", "4004");

// MongoDB
export const MONGO_URI = getEnv("MONGO_URI");

// JSON Web Token
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");

// Resend
export const EMAIL_SENDER = getEnv("EMAIL_SENDER");
export const RESEND_API_KEY = getEnv("RESEND_API_KEY");

// Cloudinary
export const CLOUDINARY_CLOUD_NAME = getEnv("CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = getEnv("CLOUDINARY_API_SECRET");
