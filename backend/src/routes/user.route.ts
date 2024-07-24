import { Router } from "express";
import { Route } from "../constants/routes";
import { getUserHandler } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);

export default userRoutes;
