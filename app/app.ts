// app/app.ts

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import { initRepositories } from "./repositories";
import { initUsecases } from "./usecases";
import { initControllers } from "./controllers";
import { configureRoutes } from "./routes";

import { Config } from "../pkg/config/config";
import { createPostgresPool } from "../pkg/database/connection";
import { Pool } from "pg";

export class MainApp {
  private cfg!: Config;
  private postgres!: Pool;

  async init(): Promise<void> {
    this.cfg = new Config();

    const app = express();
    app.use(morgan("dev"));
    app.use(cors());
    app.use(express.json());

    this.postgres = await createPostgresPool(this.cfg);

    const repositories = initRepositories({
      postgres: this.postgres,
      config: this.cfg,
    });

    const usecases = initUsecases({
      repository: repositories,
      config: this.cfg,
    });

    const controllers = initControllers({
      config: this.cfg,
      usecases,
    });

    configureRoutes(app, controllers, this.cfg);

    app.listen(this.cfg.servicePort, () => {
      console.log(`🚀 Service running on port ${this.cfg.servicePort}`);
    });
  }
}
