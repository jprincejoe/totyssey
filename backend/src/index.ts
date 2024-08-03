import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import connectToDb from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import { OK } from "./constants/http";
import authRoutes from "./routes/authRoutes";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/userRoutes";
import myEventsRoutes from "./routes/myEventsRoutes";
import configCloudinary from "./config/cloudinary";
import eventRoutes from "./routes/eventRoutes";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/health", (req: Request, res: Response) => {
  res.status(OK).send({ message: "healthy!" });
});

// unprotected routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes);

// protected routes
app.use("/api/v1/user", authenticate, userRoutes);
app.use("/api/v1/my-events", authenticate, myEventsRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`App is listening on port ${PORT} in ${NODE_ENV} environment.`);
  await connectToDb();
  configCloudinary;
});
