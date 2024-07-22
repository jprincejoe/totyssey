import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDb from "./config/db";
import { APP_ORIGIN, BASE_URL_V1, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(OK).send({ message: "healthy!" });
});

app.use(`${BASE_URL_V1}/auth`, authRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`App is listening on port ${PORT} in ${NODE_ENV} environment.`);
  await connectToDb();
});
