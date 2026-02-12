// app/controllers/index.ts

import { UserController } from "./user.controller";
import { PostController } from "./post.controller";
import { ControllerOptions } from "./controller";

/* =========================
   MAIN CONTROLLER
========================= */
export interface MainController {
  user: UserController;
  post: PostController;
}

/* =========================
   INIT
========================= */
export function initControllers(
  options: ControllerOptions
): MainController {
  return {
    user: new UserController(options),
    post: new PostController(options),
  };
}
