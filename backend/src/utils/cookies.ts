import { CookieOptions, Response } from "express";
import TokenTypes from "../constants/tokens";
import { BASE_URL_V1, NODE_ENV } from "../constants/env";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

const defaultCookieOptions: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: NODE_ENV !== EnvironmentType.Development,
};

const accessTokenOptions = (): CookieOptions => ({
  ...defaultCookieOptions,
  expires: fifteenMinutesFromNow(),
});

const refreshTokenOptions = (): CookieOptions => ({
  ...defaultCookieOptions,
  expires: thirtyDaysFromNow(),
  path: `${BASE_URL_V1}/auth/refresh`,
});

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie(TokenTypes.ACCESS_TOKEN, accessToken, accessTokenOptions())
    .cookie(TokenTypes.REFRESH_TOKEN, refreshToken, refreshTokenOptions());
