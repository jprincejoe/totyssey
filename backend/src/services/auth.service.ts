import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import VerificationCodeType from "../constants/verificationCodeTypes";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import appAssert from "../utils/appAssert";
import { oneYearFromNow, thirtyDaysFromNow } from "../utils/date";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

export type CreateAccountParams = {
  email: string;
  password: string;
};

// Create account
export const createAccount = async (data: CreateAccountParams) => {
  // check if user already exists
  const existingUser = await UserModel.exists({
    email: data.email,
  });

  // if user exists throw error
  appAssert(!existingUser, CONFLICT, "Email already in use");

  // create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  // store user id
  const userId = user._id;

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verification email

  // create session
  const session = await SessionModel.create({
    userId,
  });

  // sign refresh token
  const refreshToken = signRefreshToken({
    sessionId: session._id,
  });

  // sign access token
  const accessToken = signAccessToken({
    sessionId: session._id,
    userId,
  });

  // remove password before returning user
  const { password, ...userWithoutPassword } = user.toObject();

  // return user & tokens
  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

// Login user params
export type LoginUserParams = {
  email: string;
  password: string;
};

// login user
export const loginUser = async (data: LoginUserParams) => {
  // get the user by email
  const user = await UserModel.findOne({ email: data.email });

  appAssert(user, UNAUTHORIZED, "User does not exist");

  // validate password from the request
  const passwordIsValid = await user.comparePassword(data.password);

  appAssert(passwordIsValid, UNAUTHORIZED, "Passwords do not match");

  // store user id
  const userId = user._id;

  // create a session
  const session = await SessionModel.create({
    userId,
  });

  // store session id
  const sessionId = session._id;

  // sign refresh token
  const refreshToken = signRefreshToken({
    sessionId,
  });

  // sign access token
  const accessToken = signAccessToken({
    sessionId,
    userId,
  });

  // remove password before returning user
  const { password, ...userWithoutPassword } = user.toObject();

  // return user & tokens
  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  // get paylaod from refresh token
  const payload = verifyRefreshToken(refreshToken);

  // verify that there is a payload
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  // find session
  const session = await SessionModel.findById(payload.sessionId);

  // verify that user has a session and that it's not expired
  appAssert(
    session && session.expiresAt.getTime() > Date.now(),
    UNAUTHORIZED,
    "Session expired or not found"
  );

  // create new session expires date
  session.expiresAt = thirtyDaysFromNow();

  // save session with new date
  await session.save();

  // sign access token
  const accessToken = signAccessToken({
    sessionId: session._id,
    userId: session.userId,
  });

  // sign new refresh token
  const newRefreshToken = signRefreshToken({
    sessionId: session._id,
  });

  // return tokens
  return {
    accessToken,
    newRefreshToken,
  };
};
