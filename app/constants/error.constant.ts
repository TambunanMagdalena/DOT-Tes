// app/constants/error.constant.ts

export const ERROR_MESSAGE = {
  NOT_FOUND: "Data not found",
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  INTERNAL_SERVER_ERROR: "Internal server error",

  // database
  DB_RECORD_NOT_FOUND: "record not found",
} as const;
