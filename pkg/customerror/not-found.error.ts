// pkg/customerror/not-found.error.ts

import { BaseError } from "./base.error";

export class NotFoundError extends BaseError {
  constructor(message = "Data not found") {
    super(message, 404);
  }
}
