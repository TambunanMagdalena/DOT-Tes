// app/repositories/user.repository.ts

import { BaseRepository } from "./repository";
import { UserModel } from "../models/user.model";

export class UserRepository extends BaseRepository {
  async findByEmail(email: string): Promise<UserModel | null> {
    const result = await this.db.query(
      `SELECT * FROM backend.users WHERE email = $1 LIMIT 1`,
      [email],
    );

    return result.rows[0] ?? null;
  }

  async create(user: Partial<UserModel>): Promise<UserModel> {
    const result = await this.db.query(
      `
      INSERT INTO backend.users (email, password)
      VALUES ($1, $2)
      RETURNING *
      `,
      [user.email, user.password],
    );

    return result.rows[0];
  }
}
