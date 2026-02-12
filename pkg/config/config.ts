// pkg/config/config.ts

export class Config {
  public readonly servicePort: string;

  public readonly jwtSecret: string;
  public readonly jwtExpired: string;

  public readonly postgresHost: string;
  public readonly postgresPort: number;
  public readonly postgresUser: string;
  public readonly postgresPassword: string;
  public readonly postgresDbName: string;
  public readonly postgresSchema: string;
  public readonly postgresSSL: boolean;

  constructor() {
    this.servicePort = process.env.SERVICE_PORT ?? "3000";

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpired = process.env.JWT_EXPIRED ?? "1d";

    this.postgresHost = process.env.DB_PROFILE_HOST ?? "localhost";
    this.postgresPort = Number(process.env.DB_PROFILE_PORT ?? 5432);
    this.postgresUser = process.env.DB_PROFILE_USERNAME ?? "postgres";

    if (!process.env.DB_PROFILE_PASSWORD) {
      throw new Error("DB_PROFILE_PASSWORD is not defined");
    }
    this.postgresPassword = process.env.DB_PROFILE_PASSWORD;

    this.postgresDbName = process.env.DB_PROFILE_NAME ?? "postgres";
    this.postgresSchema = process.env.DB_PROFILE_SCHEMA ?? "public";
    this.postgresSSL =
      (process.env.DB_PROFILE_SSL ?? "false").toLowerCase() === "true";
  }
}
