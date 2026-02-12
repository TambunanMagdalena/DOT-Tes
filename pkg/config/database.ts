// pkg/config/database.ts

import { Config } from "./config";

export interface PostgresConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  schema: string;
  ssl: boolean;
}

export function getPostgresConfig(cfg: Config): PostgresConfig {
  return {
    host: cfg.postgresHost,
    port: cfg.postgresPort,
    user: cfg.postgresUser,
    password: cfg.postgresPassword,
    database: cfg.postgresDbName,
    schema: cfg.postgresSchema,
    ssl: cfg.postgresSSL,
  };
}
