import { Knex } from "knex";
import { User } from "./types/user";

export class UserStore {
  constructor(private mainDb: Knex) {}

  async getAll(): Promise<User[]> {
    return await this.mainDb.select("*").from("users");
  }
}
