import mongoose from "mongoose";
import Params from "../constants/params";
import { APP_ORIGIN } from "../constants/env";

export const buildForgotPasswordEmailRoute = (
  verificationCodeId: mongoose.Types.ObjectId,
  expiresAt: Date
): string => {
  const baseUrl = `${APP_ORIGIN}/auth/password/forgot`;
  const queryParams = new URLSearchParams({
    [Params.Email.CODE]: verificationCodeId.toString(),
    [Params.Email.EXPIRATION]: expiresAt.getTime().toString(),
  });

  return `${baseUrl}?${queryParams.toString()}`;
};
