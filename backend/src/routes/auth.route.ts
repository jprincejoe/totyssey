import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  forgotPasswordHandler,
  verifyEmailHandler,
  resetPasswordHandler,
} from "../controllers/auth.controllers";
import { Route } from "../constants/routes";

const authRoutes = Router();

authRoutes.post(Route.Auth.REGISTER, registerHandler);
authRoutes.post(Route.Auth.LOGIN, loginHandler);
authRoutes.get(Route.Auth.REFRESH, refreshHandler);
authRoutes.get(Route.Auth.LOGOUT, logoutHandler);
authRoutes.get(Route.Auth.VERIFY_EMAIL_WITH_PARAMS, verifyEmailHandler);
authRoutes.post(Route.Auth.FORGOT_PASSWORD, forgotPasswordHandler);
authRoutes.post(Route.Auth.RESET_PASSWORD, resetPasswordHandler);

export default authRoutes;
