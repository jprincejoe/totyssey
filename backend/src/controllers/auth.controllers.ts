import { CREATED, OK } from "../constants/http";
import TokenTypes from "../constants/tokens";
import SessionModel from "../models/session.model";
import { createAccount, loginUser } from "../services/auth.service";
import catchErrors from "../utils/catchErrors";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";
import { verifyAccessToken } from "../utils/jwt";
import { loginSchema, registerSchema } from "../validation/auth.validation";

export const registerHandler = catchErrors(async (req, res) => {
  // validate request
  const request = registerSchema.parse(req.body);

  // call service
  const { user, accessToken, refreshToken } = await createAccount(request);

  // return response
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  // validate request
  const request = loginSchema.parse(req.body);

  // call service
  const { accessToken, refreshToken } = await loginUser(request);

  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: "Login successful",
  });
});

export const logoutHandler = catchErrors(async (req, res) => {
  // get the access token
  const accessToken = req.cookies[TokenTypes.ACCESS_TOKEN];

  // try to get payload if we have an access token
  if (accessToken) {
    // get the session id
    const payload = verifyAccessToken(accessToken);

    // remove session from database if we have a session id
    if (payload) {
      await SessionModel.findByIdAndDelete(payload.sessionId);
    }
  }

  // clear cookies
  return clearAuthCookies(res).status(OK).json({ message: "Logout succesful" });
});
