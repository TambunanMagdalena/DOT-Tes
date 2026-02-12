// app/models/response.model.ts

export interface Response<T = any> {
  status_code: number;
  message?: any;
  data?: T;
}

export interface BasicResponse {
  status_code: number;
  message?: any;
}

export interface Pagination {
  page: number;
  page_size: number;
  total: number;
  total_page: number;
}

export interface ResponseWithPaginate<T = any> extends Response<T> {
  pagination?: Pagination;
}
