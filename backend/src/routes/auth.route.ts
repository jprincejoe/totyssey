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
import Params from "../constants/params";
const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get(`email/verify/:${Params.Email.CODE}`, verifyEmailHandler);
authRoutes.post("/password/forgot", forgotPasswordHandler);
authRoutes.post("/password/reset", resetPasswordHandler);

export default authRoutes;
