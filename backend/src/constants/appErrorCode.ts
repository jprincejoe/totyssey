const enum AppErrorCode {
  // Authentication/Authorization Errors
  INVALID_ACCESS_TOKEN = "InvalidAccessToken",
  INVALID_REFRESH_TOKEN = "InvalidRefreshToken",
  UNAUTHORIZED_ACCESS = "UnauthorizedAccess",

  // Validation Errors
  VALIDATION_ERROR = "ValidationError",
  INVALID_INPUT = "InvalidInput",
  MISSING_REQUIRED_FIELDS = "MissingRequiredFields",

  // Resource Errors
  RESOURCE_NOT_FOUND = "ResourceNotFound",
  RESOURCE_CONFLICT = "ResourceConflict",
  RESOURCE_CREATION_FAILED = "ResourceCreationFailed",

  // Server Errors
  INTERNAL_SERVER_ERROR = "InternalServerError",
  SERVICE_UNAVAILABLE = "ServiceUnavailable",
  TOO_MANY_REQUESTS = "TooManyRequests",

  // Unknown Error
  UNKNOWN_ERROR = "UnknownError",
}

export default AppErrorCode;
