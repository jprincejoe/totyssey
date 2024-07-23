import mongoose, { ObjectId } from "mongoose";
import Params from "../constants/params";
import { Route } from "../constants/routes";

export const buildVerificationEmailRoute = (
  verificationCodeId: mongoose.Types.ObjectId,
  expiresAt: Date
): string => {
  const baseUrl = `${Route.Auth.BASE}${Route.Auth.FORGOT_PASSWORD}`;
  const queryParams = new URLSearchParams({
    [Params.Email.CODE]: verificationCodeId.toString(),
    [Params.Email.EXPIRATION]: expiresAt.getTime().toString(),
  });

  return `${baseUrl}?${queryParams.toString()}`;
};
