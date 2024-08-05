import { Router } from "express";
import {
  getEventHandler,
  getEventsHandler,
} from "../controllers/eventsController";

const eventRoutes = Router();

eventRoutes.get("/search", getEventsHandler);
eventRoutes.get("/:id", getEventHandler);

export default eventRoutes;
