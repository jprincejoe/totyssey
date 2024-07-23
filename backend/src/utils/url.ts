import mongoose, { ObjectId } from "mongoose";
import PARAMS from "../constants/params";
import { ROUTES } from "../constants/routes";

export const buildVerificationEmailRoute = (
  verificationCodeId: mongoose.Types.ObjectId,
  expiresAt: Date
): string => {
  const baseUrl = `${ROUTES.AUTH.BASE}${ROUTES.AUTH.FORGOT_PASSWORD}`;
  const queryParams = new URLSearchParams({
    [PARAMS.EMAIL.CODE]: verificationCodeId.toString(),
    [PARAMS.EMAIL.EXPIRATION]: expiresAt.getTime().toString(),
  });

  return `${baseUrl}?${queryParams.toString()}`;
};
