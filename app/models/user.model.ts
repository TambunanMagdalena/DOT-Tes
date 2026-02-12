// app/models/user.model.ts

/* =========================
   BASE REQUEST
========================= */
export interface BaseUserRequest {
  email: string;
  password: string;
}

/* =========================
   REQUEST
========================= */
export interface CreateUserRequest extends BaseUserRequest {}

export interface LoginUserRequest extends BaseUserRequest {}

/* =========================
   RESPONSE
========================= */
export interface UserResponse {
  id: number;
  email: string;
  created_at: Date;
  updated_at: Date;
}

/* =========================
   MODEL (DATABASE)
========================= */
export interface UserModel extends UserResponse {
  password: string;
}
