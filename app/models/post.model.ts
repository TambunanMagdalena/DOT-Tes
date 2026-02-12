// app/models/post.model.ts

/* =========================
   BASE REQUEST
========================= */
export interface BasePostRequest {
  title: string;
  content?: string;
}

/* =========================
   REQUEST
========================= */
export interface CreatePostRequest extends BasePostRequest {}

export interface UpdatePostRequest extends Partial<BasePostRequest> {}

/* =========================
   RESPONSE
========================= */
export interface PostResponse {
  id: number;
  title: string;
  content: string | null;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

/* =========================
   MODEL (DATABASE)
========================= */
export interface PostModel extends PostResponse {}
