import mongoose from "mongoose";
import { VerificationCode } from "../types/verificationCode";

const VerificationCodeSchema = new mongoose.Schema<VerificationCode>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const VerificationCodeModel = mongoose.model<VerificationCode>(
  "VerificationCode",
  VerificationCodeSchema,
  "verification_codes"
);

export default VerificationCodeModel;
