import { NextFunction, Request, RequestHandler, Response } from "express";
import TokenType from "../constants/tokens";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";
import { verifyAccessToken } from "../utils/jwt";
import setUserRequestValues from "../utils/request";

const authenticate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  const { payload } = verifyAccessToken(accessToken);

  // verify we have a valid payload
  appAssert(
    payload,
    UNAUTHORIZED,
    "Invalid or expired token",
    AppErrorCode.INVALID_ACCESS_TOKEN
  );

  // set userId and sessionId on request
  setUserRequestValues(req, payload);

  // call next
  next();
};

export default authenticate;
