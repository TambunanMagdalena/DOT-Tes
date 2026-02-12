// app/controllers/user.controller.ts

import { BaseController } from "./controller";
import { CreateUserRequest, LoginUserRequest } from "../models/user.model";
import { Response } from "../models/response.model";
import { RESPONSE_MESSAGE } from "../constants/response.constant";

export class UserController extends BaseController {
  async register(body: CreateUserRequest): Promise<Response> {
    const data = await this.usecases.user.register(body);

    return {
      status_code: 201,
      message: RESPONSE_MESSAGE.CREATED,
      data,
    };
  }

  async login(body: LoginUserRequest): Promise<Response> {
    const data = await this.usecases.user.login(body);

    return {
      status_code: 200,
      message: RESPONSE_MESSAGE.SUCCESS,
      data,
    };
  }
}
