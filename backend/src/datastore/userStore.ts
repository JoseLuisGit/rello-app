import { Knex } from "knex";
import { User } from "./types/user";

export class UserStore {
  constructor(private mainDb: Knex) {}

  async getAll(): Promise<User[]> {
    return await this.mainDb.select("*").from("users");
  }

  async getByName(name: string): Promise<User> {
    return await this.mainDb.select("*").from("users").where({ name }).first();
  }

  async create(userData: Partial<User>) {
    await this.mainDb
      .insert({ ...userData, updated_at: new Date(), created_at: new Date() })
      .into("users");
    return userData;
  }
}
