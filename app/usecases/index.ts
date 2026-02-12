// app/usecase/index.ts

import { UserUsecase } from "./user.usecase";
import { PostUsecase } from "./post.usecase";
import { UsecaseOptions } from "./usecase";

/* =========================
   MAIN USECASE
========================= */
export interface MainUsecase {
  user: UserUsecase;
  post: PostUsecase;
}

/* =========================
   INIT
========================= */
export function initUsecases(options: UsecaseOptions): MainUsecase {
  return {
    user: new UserUsecase(options),
    post: new PostUsecase(options),
  };
}
