import { RequestHandler } from "express";
import TokenType from "../constants/tokens";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";
import { verifyAccessToken } from "../utils/jwt";
import setUserRequestValues from "../utils/request";

const authenticate: RequestHandler = (req, res, next) => {
  console.log("In authenticate....");
  // get access token from cookies
  const accessToken = req.cookies[TokenType.ACCESS_TOKEN] as string | undefined;

  console.log("Access token", accessToken);

  // verify we have an access token
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.INVALID_ACCESS_TOKEN
  );

  console.log("   Found access token");

  // decode token
  const { payload } = verifyAccessToken(accessToken);

  console.log("Payload", payload);

  // verify we have a valid token
  appAssert(
    payload,
    UNAUTHORIZED,
    "Invalid or expired token",
    AppErrorCode.INVALID_ACCESS_TOKEN
  );

  // set userId and sessionId on request
  setUserRequestValues(req, payload);

  console.log("Setting user and session on request object...");

  // call next
  next();
};

export default authenticate;
