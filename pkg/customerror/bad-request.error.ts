// pkg/customerror/bad-request.error.ts

import { BaseError } from "./base.error";

export class BadRequestError extends BaseError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}
