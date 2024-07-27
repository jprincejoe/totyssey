//#region Imports

import { APP_ORIGIN } from "../constants/env";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../constants/http";
import { Route } from "../constants/routes";
import VerificationCodeType from "../constants/verificationCodeTypes";
import SessionModel from "../models/session.model";
import UserModel, { UserDocument } from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import appAssert from "../utils/appAssert";
import { hashValue } from "../utils/bcrypt";
import {
  fiveMinutesAgo,
  oneHourFromNow,
  oneYearFromNow,
  thirtyDaysFromNow,
} from "../utils/date";
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from "../utils/emailTemplates";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { sendMail } from "../utils/sendMail";
import { buildForgotPasswordEmailRoute } from "../utils/url";

export type CreateAccountParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

//#endregion

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
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  });

  // store user id
  const userId = user._id;

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EMAIL_VERIFICATION,
    expiresAt: oneYearFromNow(),
  });

  console.log(verificationCode._id);
  // send verification email
  const emailUrl =
    APP_ORIGIN + Route.Auth.VERIFY_EMAIL + `/${verificationCode._id}`;

  console.log(emailUrl);

  const result = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(emailUrl),
  });

  console.log(result);

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

  // return user & tokens
  return {
    user: user.omitPassword(),
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

  appAssert(user, UNAUTHORIZED, "Invalid credentials");

  // validate password from the request
  const passwordIsValid = await user.comparePassword(data.password);

  appAssert(passwordIsValid, UNAUTHORIZED, "Invalid credentials");

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

  // return user & tokens
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

// refresh user access token
export const refreshUserAccessToken = async (refreshToken: string) => {
  // get paylaod from refresh token
  const { payload } = verifyRefreshToken(refreshToken);

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

// verify user by email
export const verifyEmail = async (code: string) => {
  // get the verification code
  const verificationCode = await VerificationCodeModel.findById({
    _id: code,
    type: VerificationCodeType.EMAIL_VERIFICATION,
    expiresAt: { $gt: new Date() },
  });

  // verify there is a valid verification code found
  appAssert(
    verificationCode,
    NOT_FOUND,
    "Invalid or expired verification code"
  );

  // update user verified to true
  const updatedUser = await UserModel.findByIdAndUpdate(
    verificationCode.userId,
    {
      verified: true,
    },
    { new: true }
  );

  // verify the user has been verified
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to verify email");

  // delete the verification code
  await verificationCode.deleteOne();

  // return user
  return {
    user: updatedUser.omitPassword(),
  };
};

// forgot password email
export const sendForgotPasswordEmail = async (email: string) => {
  // get the user by email
  const user = await UserModel.findOne({ email });
  appAssert(user, NOT_FOUND, "User not found");

  // check the rate limit
  const fiveMinAgo = fiveMinutesAgo();
  const count = await VerificationCodeModel.countDocuments({
    userId: user._id,
    type: VerificationCodeType.PASSWORD_RESET,
    createdAt: { $gt: fiveMinAgo },
  });

  // verify the user hasn't requested a reset more than 2 times in 5 minutes
  appAssert(
    count < 2,
    TOO_MANY_REQUESTS,
    "Too many password reset requests - please try again later"
  );

  // create verification code
  const expiresAt = oneHourFromNow();
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.PASSWORD_RESET,
    expiresAt,
  });

  // verify verification code was created
  appAssert(
    verificationCode,
    INTERNAL_SERVER_ERROR,
    "Error creating verification code"
  );

  // build url for email template
  const url = buildForgotPasswordEmailRoute(verificationCode._id, expiresAt);

  // send email
  const { data, error } = await sendMail({
    to: user.email,
    ...getPasswordResetTemplate(url),
  });

  // verify email was sent successfully
  appAssert(
    data?.id,
    INTERNAL_SERVER_ERROR,
    `${error?.name} - ${error?.message}`
  );

  // return success
  return {
    url,
    emailId: data.id,
  };
};

// reset password params
type ResetPasswordParams = {
  password: string;
  verificationCode: string;
};

// reset password response
interface ResetPasswordResponse {
  user: Omit<UserDocument, "password">;
}

// reset password
export const resetPassword = async ({
  password,
  verificationCode,
}: ResetPasswordParams): Promise<ResetPasswordResponse> => {
  // get the verification code
  const foundVerificationCode = await VerificationCodeModel.findOne({
    _id: verificationCode,
    type: VerificationCodeType.PASSWORD_RESET,
    expiresAt: { $gt: new Date() },
  });

  // verify we have a valid verification code
  appAssert(
    foundVerificationCode,
    NOT_FOUND,
    "Invalid or expired verification code"
  );

  // update the user's password
  const updatedUser = await UserModel.findByIdAndUpdate(
    foundVerificationCode.userId,
    {
      password: await hashValue(password),
    },
    {
      new: true,
    }
  );

  // verify user was updated successfully
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Faild to reset password");

  // delete the verification code after it was used
  await foundVerificationCode.deleteOne();

  // delete all sessions
  await SessionModel.deleteMany({
    userId: updatedUser._id,
  });

  // return success with updated user
  return {
    user: updatedUser.omitPassword(),
  };
};
