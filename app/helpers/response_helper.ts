// app/helpers/response.helper.ts
import {
  Response,
  BasicResponse,
  ResponseWithPaginate,
  Pagination,
} from "../models/response.model";

/* =========================
   RESPONSE WRAPPER
========================= */
export function responseWrapper<T>(statusCode: number, response: T) {
  return {
    statusCode,
    body: response,
  };
}

/* =========================
   STANDARD RESPONSE
========================= */
export function standardResponse<T>(
  statusCode: number,
  message: any,
  data?: T,
  pagination?: Pagination,
) {
  if (!pagination) {
    const res: Response<T> = {
      status_code: statusCode,
      message,
      data,
    };
    return responseWrapper(statusCode, res);
  }

  const res: ResponseWithPaginate<T> = {
    status_code: statusCode,
    message,
    data,
    pagination,
  };

  return responseWrapper(statusCode, res);
}

/* =========================
   BASIC RESPONSE
========================= */
export function basicResponse(statusCode: number, message: any) {
  const res: BasicResponse = {
    status_code: statusCode,
    message,
  };

  return responseWrapper(statusCode, res);
}
