import jwt, { SignOptions } from "jsonwebtoken";
import { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & { secret: string };

const defaults: SignOptions = {
  audience: ["user"],
};

const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET,
};

const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};

export const signAccessToken = (payload: AccessTokenPayload) => {
  const { secret, ...signOpts } = accessTokenSignOptions;
  return jwt.sign(payload, secret, { ...defaults, ...signOpts });
};

export const signRefreshToken = (payload: RefreshTokenPayload) => {
  const { secret, ...signOpts } = refreshTokenSignOptions;
  return jwt.sign(payload, secret, { ...defaults, ...signOpts });
};

interface AccessTokenVerificationResult {
  payload?: AccessTokenPayload;
  error?: string;
}

export const verifyAccessToken = (
  accessToken: string
): AccessTokenVerificationResult => {
  try {
    const payload = jwt.verify(accessToken, JWT_SECRET, {
      ...defaults,
      ...accessTokenSignOptions,
    }) as AccessTokenPayload;

    return { payload };
  } catch (error: any) {
    console.log("JWT access token verification failed:", error.message);
    return {
      error: error.message,
    };
  }
};

interface RefreshTokenVerificationResult {
  payload?: RefreshTokenPayload;
  error?: string;
}

export const verifyRefreshToken = (
  refreshToken: string
): RefreshTokenVerificationResult => {
  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET, {
      ...defaults,
      ...refreshTokenSignOptions,
    }) as RefreshTokenPayload;

    return { payload };
  } catch (error: any) {
    console.log("JWT refresh token verification failed:", error.message);
    return {
      error: error.message,
    };
  }
};
