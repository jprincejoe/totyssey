import bcrypt from "bcrypt";

export const hashValue = async (value: string, saltRounds?: number) =>
  bcrypt.hash(value, saltRounds || 10);

export const comparePasswords = async (
  plaintextValue: string,
  hashedValue: string
) => bcrypt.compare(plaintextValue, hashedValue).catch(() => false);
