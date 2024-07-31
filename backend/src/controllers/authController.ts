//#region Imports

import { Request, Response } from "express";
import AppErrorCode from "../constants/appErrorCode";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import Params from "../constants/params";
import TokenType from "../constants/tokens";
import SessionModel from "../models/sessionModel";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
  verifyEmail,
  sendForgotPasswordEmail,
  resetPassword,
} from "../services/authService";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";
import { verifyAccessToken } from "../utils/jwt";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationCodeSchema,
} from "../validation/authValidation";

//#endregion

export const registerHandler = catchErrors(
  async (req: Request, res: Response) => {
    // validate request
    const request = registerSchema.parse(req.body);

    // call service
    const { user, accessToken, refreshToken } = await createAccount(request);

    // return response
    return setAuthCookies({ res, accessToken, refreshToken })
      .status(CREATED)
      .json(user);
  }
);

export const loginHandler = catchErrors(async (req: Request, res: Response) => {
  // validate request
  const request = loginSchema.parse(req.body);

  // call service
  const { accessToken, refreshToken, user } = await loginUser(request);

  // Set auth cookies
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json(user);
});

export const logoutHandler = catchErrors(
  async (req: Request, res: Response) => {
    // get the access token
    const accessToken = req.cookies[TokenType.ACCESS_TOKEN] as
      | string
      | undefined;

    // try to get payload if we have an access token
    if (accessToken) {
      // get the session id
      const { payload } = verifyAccessToken(accessToken);

      // remove session from database if we have a session id
      if (payload) {
        await SessionModel.findByIdAndDelete(payload.sessionId);
      }
    }

    // clear cookies
    return clearAuthCookies(res)
      .status(OK)
      .json({ message: "Logout succesful" });
  }
);

export const refreshHandler = catchErrors(
  async (req: Request, res: Response) => {
    // get current refresh token
    const refreshToken = req.cookies[TokenType.REFRESH_TOKEN] as
      | string
      | undefined;

    // Verify we have a refresh token
    appAssert(
      refreshToken,
      UNAUTHORIZED,
      "Refresh token not found",
      AppErrorCode.INVALID_REFRESH_TOKEN
    );

    // get new access and refresh tokens
    const { accessToken, newRefreshToken } = await refreshUserAccessToken(
      refreshToken
    );

    // set new cookies
    return setAuthCookies({ res, accessToken, refreshToken: newRefreshToken })
      .status(OK)
      .json({
        message: "Tokens refreshed",
      });
  }
);

export const verifyEmailHandler = catchErrors(
  async (req: Request, res: Response) => {
    console.log("in verifyEmailHandler");

    // get verification code
    const code = verificationCodeSchema.parse(req.params[Params.Email.CODE]);

    // try to verify user and update status
    await verifyEmail(code);

    // return success
    return res.status(OK).json({ message: "Email verified" });
  }
);

export const forgotPasswordHandler = catchErrors(
  async (req: Request, res: Response) => {
    // get email from body
    const request = emailSchema.parse(req.body);

    // send email
    await sendForgotPasswordEmail(request.email);

    // return success if no errors thrown
    return res.status(OK).json({ message: "Password reset email sent" });
  }
);

export const resetPasswordHandler = catchErrors(
  async (req: Request, res: Response) => {
    // get verification code and password from body
    const request = resetPasswordSchema.parse(req.body);

    // call reset password
    await resetPassword(request);

    // return success
    return clearAuthCookies(res).status(OK).json({
      message: "Password reset successful",
    });
  }
);
