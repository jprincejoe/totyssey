import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import AppError from "../utils/AppError";

// Error for Zod validation
const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));

  return res.status(BAD_REQUEST).json({
    message: "Bad request",
    errors,
  });
};

// Error for custom App Error
const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error);

  // Check for Zod validation error
  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  // Check for custom app error
  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  // Otherwise, return internal server error 500
  return res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};

export default errorHandler;