// app/repositories/index.ts

import { UserRepository } from "./user.repository";
import { PostRepository } from "./post.repository";
import { RepositoryOptions } from "./repository";

/* =========================
   MAIN REPOSITORY
========================= */
export interface MainRepository {
  user: UserRepository;
  post: PostRepository;
}

/* =========================
   INIT
========================= */
export function initRepositories(options: RepositoryOptions): MainRepository {
  if (!options.cache) {
    options.cache = {};
  }

  return {
    user: new UserRepository(options),
    post: new PostRepository(options),
  };
}
