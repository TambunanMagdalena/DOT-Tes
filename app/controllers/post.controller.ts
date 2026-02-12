// app/controllers/post.controller.ts

import { BaseController } from "./controller";
import { CreatePostRequest } from "../models/post.model";
import { Response } from "../models/response.model";
import { RESPONSE_MESSAGE } from "../constants/response.constant";

export class PostController extends BaseController {
  async create(userId: number, body: CreatePostRequest): Promise<Response> {
    const data = await this.usecases.post.create(userId, body);

    return {
      status_code: 201,
      message: RESPONSE_MESSAGE.CREATED,
      data,
    };
  }

  async getByUser(userId: number): Promise<Response> {
    const data = await this.usecases.post.getByUser(userId);

    return {
      status_code: 200,
      message: RESPONSE_MESSAGE.SUCCESS,
      data,
    };
  }
}
