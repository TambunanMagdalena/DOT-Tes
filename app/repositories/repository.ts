// app/repositories/repository.ts

import type { Pool } from "pg";
import { Config } from "../../pkg/config/config";
import { PostModel } from "../models/post.model";
import { UserModel } from "../models/user.model";

/* =========================
   CACHE
========================= */
export interface Cache {
  user?: UserModel;
  post?: PostModel;
}

/* =========================
   OPTIONS
========================= */
export interface RepositoryOptions {
  postgres: Pool;
  config: Config;
  cache?: Cache;
}

export class BaseRepository {
  protected db: Pool;
  protected config: Config;
  protected cache: Cache;

  constructor(options: RepositoryOptions) {
    this.db = options.postgres;
    this.config = options.config;
    this.cache = options.cache ?? {};
  }
}
