// pkg/database/connection.ts
import { Pool } from "pg";
import type { Config } from "../../pkg/config/config";
import { getPostgresConfig } from "../config/database";

export async function createPostgresPool(cfg: Config): Promise<Pool> {
  const dbCfg = getPostgresConfig(cfg);

  const pool = new Pool({
    host: dbCfg.host,
    port: dbCfg.port,
    user: dbCfg.user,
    password: dbCfg.password,
    database: dbCfg.database,
    ssl: dbCfg.ssl,
  });

  await pool.query(`SET search_path TO ${dbCfg.schema}`);
  return pool;
}
