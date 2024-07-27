import mongoose from "mongoose";
import Params from "../constants/params";
import { Route } from "../constants/routes";
import { APP_ORIGIN } from "../constants/env";

export const buildVerificationEmailRoute = (
  verificationCodeId: mongoose.Types.ObjectId,
  expiresAt: Date
): string => {
  const baseUrl = `${APP_ORIGIN}${Route.Auth.BASE}${Route.Auth.FORGOT_PASSWORD}`;
  const queryParams = new URLSearchParams({
    [Params.Email.CODE]: verificationCodeId.toString(),
    [Params.Email.EXPIRATION]: expiresAt.getTime().toString(),
  });

  return `${baseUrl}?${queryParams.toString()}`;
};
