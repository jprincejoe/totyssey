import { RequestHandler } from "express";
import TokenType from "../constants/tokens";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";
import { verifyAccessToken } from "../utils/jwt";

const authenticate: RequestHandler = (req, res, next) => {
  // get access token from cookies
  const accessToken = req.cookies[TokenType.ACCESS_TOKEN] as string | undefined;

  // verify we have an access token
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.INVALID_ACCESS_TOKEN
  );

  // decode token
  const { error, payload } = verifyAccessToken(accessToken);

  // verify we have a valid token
  appAssert(
    payload,
    UNAUTHORIZED,
    "Invalid or expired token",
    AppErrorCode.INVALID_ACCESS_TOKEN
  );
};
