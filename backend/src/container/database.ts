import { AwilixContainer, Lifetime, asClass, asFunction } from "awilix";
import knex, { Knex } from "knex";
import { IEnvCradle } from "./environment";
import { UserStore } from "@app/datastore/userStore";

export interface IDatabaseCradle {
  mainDb: Knex;
  userStore: UserStore;
}

const registerDatabase = (container: AwilixContainer<IDatabaseCradle>) => {
  container.register({
    mainDb: asFunction(({ config }: IEnvCradle) => {
      return knex({
        client: "pg",
        connection: config.databases.main,
      });
    }).singleton(),
    userStore: asClass(UserStore).classic().setLifetime(Lifetime.SINGLETON),
  });
};

export default registerDatabase;
