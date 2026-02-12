// app/usecase/user.usecase.ts

import { BaseUsecase } from "./usecase";
import {
  CreateUserRequest,
  LoginUserRequest,
  UserModel,
  UserResponse,
} from "../models/user.model";
import { ERROR_MESSAGE } from "../constants/error.constant";
import { hashPassword, comparePassword } from "../helpers/password.helper";
import { generateToken } from "../helpers/jwt.helper";

import { BadRequestError } from "../../pkg/customerror/bad-request.error";
import { NotFoundError } from "../../pkg/customerror/not-found.error";
import { UnauthorizedError } from "../../pkg/customerror/unauthorized.error";

export class UserUsecase extends BaseUsecase {
  async register(req: CreateUserRequest): Promise<UserResponse> {
    const exist = await this.repo.user.findByEmail(req.email);
    if (exist) {
      throw new BadRequestError(ERROR_MESSAGE.BAD_REQUEST);
    }

    const hashed = await hashPassword(req.password);

    const user = await this.repo.user.create({
      email: req.email,
      password: hashed,
    });

    return this.toResponse(user);
  }

  async login(req: LoginUserRequest): Promise<{ access_token: string }> {
    const user = await this.repo.user.findByEmail(req.email);
    if (!user) {
      throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND);
    }

    const valid = await comparePassword(req.password, user.password);
    if (!valid) {
      throw new UnauthorizedError(ERROR_MESSAGE.UNAUTHORIZED);
    }

    const token = generateToken(
      { id: user.id, email: user.email },
      this.config.jwtSecret,
    );

    return { access_token: token };
  }

  private toResponse(user: UserModel): UserResponse {
    const { password, ...rest } = user;
    return rest;
  }
}
