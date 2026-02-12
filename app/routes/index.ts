// app/routes/index.ts

import { Express, Request, Response, NextFunction } from "express";
import { MainController } from "../controllers";
import { jwtMiddleware, AuthRequest } from "../middleware/jwt.middleware";
import { Config } from "../../pkg/config/config";
import { BaseError } from "../../pkg/customerror/base.error";

export function configureRoutes(
  app: Express,
  controllers: MainController,
  config: Config,
) {
  /* ===== AUTH ===== */
  app.post("/auth/register", async (req, res, next) => {
    try {
      const result = await controllers.user.register(req.body);
      res.status(result.status_code).json(result);
    } catch (e) {
      next(e);
    }
  });

  app.post("/auth/login", async (req, res, next) => {
    try {
      const result = await controllers.user.login(req.body);
      res.status(result.status_code).json(result);
    } catch (e) {
      next(e);
    }
  });

  /* ===== POSTS (JWT) ===== */
  app.post(
    "/posts",
    jwtMiddleware(config),
    async (req: AuthRequest, res, next) => {
      try {
        const result = await controllers.post.create(req.user!.id, req.body);
        res.status(result.status_code).json(result);
      } catch (e) {
        next(e);
      }
    },
  );

  app.get(
    "/posts",
    jwtMiddleware(config),
    async (req: AuthRequest, res, next) => {
      try {
        const result = await controllers.post.getByUser(req.user!.id);
        res.status(result.status_code).json(result);
      } catch (e) {
        next(e);
      }
    },
  );

  /* ===== GLOBAL ERROR ===== */
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof BaseError) {
      return res.status(err.statusCode).json({
        status_code: err.statusCode,
        message: err.message,
      });
    }

    return res.status(500).json({
      status_code: 500,
      message: "Internal server error",
    });
  });
}
