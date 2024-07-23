import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDb from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";
import { ROUTES } from "./constants/routes";

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

app.get(ROUTES.HEALTH.BASE, (req, res) => {
  res.status(OK).send({ message: "healthy!" });
});

// routes
app.use(ROUTES.AUTH.BASE, authRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`App is listening on port ${PORT} in ${NODE_ENV} environment.`);
  await connectToDb();
});
