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
import { ROUTES } from "../constants/routes";

const authRoutes = Router();

authRoutes.post(ROUTES.AUTH.REGISTER, registerHandler);
authRoutes.post(ROUTES.AUTH.LOGIN, loginHandler);
authRoutes.get(ROUTES.AUTH.REFRESH, refreshHandler);
authRoutes.get(ROUTES.AUTH.LOGOUT, logoutHandler);
authRoutes.get(ROUTES.AUTH.VERIFY_EMAIL_WITH_PARAMS, verifyEmailHandler);
authRoutes.post(ROUTES.AUTH.FORGOT_PASSWORD, forgotPasswordHandler);
authRoutes.post(ROUTES.AUTH.RESET_PASSWORD, resetPasswordHandler);

export default authRoutes;
