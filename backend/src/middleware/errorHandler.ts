import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import AppError from "../utils/AppError";
import { clearAuthCookies } from "../utils/cookies";
import { Route } from "../constants/routes";
import AppErrorCode from "../constants/appErrorCode";

// Standard error response format
const errorResponse = (
  httpStatusCode: number,
  message: string,
  appErrorCode: AppErrorCode
) => ({
  httpStatusCode,
  message,
  appErrorCode,
});

// Error for Zod validation
const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));

  // Log array of errors since not sending to frontend
  console.log(errors);

  // Construct error response
  const errResponse = errorResponse(
    BAD_REQUEST,
    "Invalid or missing fields",
    AppErrorCode.VALIDATION_ERROR
  );

  // Return error
  return res.status(BAD_REQUEST).json(errResponse);
};

// Error for custom App Error
const handleAppError = (res: Response, error: AppError) => {
  // Construct error response
  const errResponse = errorResponse(
    error.statusCode,
    error.message,
    error.errorCode || AppErrorCode.UNKNOWN_ERROR
  );

  // Return error
  return res.status(error.statusCode).json(errResponse);
};

// custom error handler method
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error);

  // if error is on token refresh then clear cookies
  if (req.path === Route.Auth.BASE + Route.Auth.REFRESH) {
    clearAuthCookies(res);
  }

  // Check for Zod validation error
  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  // Check for custom app error
  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  // Otherwise, return internal server error 500
  const errResponse = errorResponse(
    INTERNAL_SERVER_ERROR,
    "Internal server error",
    AppErrorCode.INTERNAL_SERVER_ERROR
  );

  // Return error
  return res.status(INTERNAL_SERVER_ERROR).json(errResponse);
};

export default errorHandler;
