// app/repositories/post.repository.ts

import { BaseRepository } from "./repository";
import { PostModel } from "../models/post.model";

export class PostRepository extends BaseRepository {
  async create(post: Partial<PostModel>): Promise<PostModel> {
    const result = await this.db.query(
      `
      INSERT INTO backend.posts (title, content, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [post.title, post.content, post.user_id],
    );

    return result.rows[0];
  }

  async findByUserId(userId: number): Promise<PostModel[]> {
    const result = await this.db.query(
      `SELECT * FROM backend.posts WHERE user_id = $1`,
      [userId],
    );

    return result.rows;
  }
}
