// app/helpers/jwt.helper.ts

import jwt, { SignOptions } from "jsonwebtoken";

export interface JwtPayload {
  id: number;
  email: string;
}

type ExpiresIn = SignOptions["expiresIn"];

export function generateToken(
  payload: JwtPayload,
  secret: string,
  expiresIn: ExpiresIn = "1d",
): string {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token: string, secret: string): JwtPayload {
  return jwt.verify(token, secret) as JwtPayload;
}
