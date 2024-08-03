import mongoose from "mongoose";
import VerificationCodeType from "../constants/verificationCodeTypes";

export type VerificationCode = {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: VerificationCodeType;
  expiresAt: Date;
  createdAt: Date;
};
