import { CookieOptions, Response } from "express";
import TokenType from "../constants/tokens";
import { NODE_ENV } from "../constants/env";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";
import EnvironmentType from "../constants/environmentTypes";

const defaultCookieOptions: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: NODE_ENV !== EnvironmentType.DEVELOPMENT,
};

const accessTokenOptions = (): CookieOptions => ({
  ...defaultCookieOptions,
  expires: fifteenMinutesFromNow(),
});

const refreshTokenOptions = (): CookieOptions => ({
  ...defaultCookieOptions,
  expires: thirtyDaysFromNow(),
});

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie(TokenType.ACCESS_TOKEN, accessToken, accessTokenOptions())
    .cookie(TokenType.REFRESH_TOKEN, refreshToken, refreshTokenOptions());

export const clearAuthCookies = (res: Response) => {
  return res
    .clearCookie(TokenType.ACCESS_TOKEN)
    .clearCookie(TokenType.REFRESH_TOKEN, {});
};
