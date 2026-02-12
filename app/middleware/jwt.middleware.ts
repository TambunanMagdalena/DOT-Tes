// app/middleware/jwt.middleware.ts

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt.helper";
import { UnauthorizedError } from "../../pkg/customerror/unauthorized.error";
import { Config } from "../../pkg/config/config";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export function jwtMiddleware(config: Config) {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError("Authorization header missing");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      throw new UnauthorizedError("Invalid authorization format");
    }

    try {
      const payload = verifyToken(token, config.jwtSecret);

      req.user = {
        id: payload.id,
        email: payload.email,
      };

      next();
    } catch (err) {
      throw new UnauthorizedError("Invalid or expired token");
    }
  };
}
