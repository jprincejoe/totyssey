import { CONFLICT, UNAHTORIZED } from "../constants/http";
import VerificationCodeType from "../constants/verificationCodeTypes";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import appAssert from "../utils/appAssert";
import { oneYearFromNow } from "../utils/date";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

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

// Login user
export type LoginUserParams = {
  email: string;
  password: string;
};

export const loginUser = async (data: LoginUserParams) => {
  // get the user by email
  const user = await UserModel.findOne({ email: data.email });

  appAssert(user, UNAHTORIZED, "User does not exist");

  // validate password from the request
  const passwordIsValid = await user.comparePassword(data.password);

  appAssert(passwordIsValid, UNAHTORIZED, "Passwords do not match");

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
