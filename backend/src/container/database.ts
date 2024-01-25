import { AwilixContainer, Lifetime, asClass, asFunction } from "awilix";
import knex, { Knex } from "knex";
import { IEnvCradle } from "./environment";
import { UserStore } from "@app/datastore/userStore";
import { AuthStore } from "@app/datastore/authStore";

export interface IDatabaseCradle {
  mainDb: Knex;
  authStore: AuthStore;
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
    authStore: asClass(AuthStore).classic().setLifetime(Lifetime.SINGLETON),
  });
};

export default registerDatabase;
