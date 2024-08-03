import { Router } from "express";
import { getEventsHandler } from "../controllers/eventsController";

const eventRoutes = Router();

eventRoutes.get("/search", getEventsHandler);

export default eventRoutes;
