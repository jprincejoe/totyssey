import { Router } from "express";
import { createEventHandler } from "../controllers/myEventsController";
import { processMultipartFormData } from "../config/multer";

const myEventsRoutes = Router();

// Upload with Multer middleware
myEventsRoutes.post("/", processMultipartFormData, createEventHandler);

export default myEventsRoutes;
