// app/usecase/post.usecase.ts

import { BaseUsecase } from "./usecase";
import { CreatePostRequest, PostResponse } from "../models/post.model";
import { NotFoundError } from "../../pkg/customerror/not-found.error";
import { ERROR_MESSAGE } from "../constants/error.constant";

export class PostUsecase extends BaseUsecase {
  async create(userId: number, req: CreatePostRequest): Promise<PostResponse> {
    if (!userId) {
      throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND);
    }

    const post = await this.repo.post.create({
      title: req.title,
      content: req.content ?? null,
      user_id: userId,
    });

    return post;
  }

  async getByUser(userId: number): Promise<PostResponse[]> {
    const posts = await this.repo.post.findByUserId(userId);

    if (!posts || posts.length === 0) {
      throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND);
    }

    return posts;
  }
}
