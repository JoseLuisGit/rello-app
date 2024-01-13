import { AwilixContainer, asValue } from "awilix";

type DataBaseConfig = {
  server: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export type Environment = {
  log_level: string;
  port: string;
  databases: {
    main: DataBaseConfig;
  };
};

export interface IEnvCradle {
  config: Environment;
}

const registerEnvironment = (container: AwilixContainer<IEnvCradle>) => {
  container.register({
    config: asValue({
      log_level: process.env.LOG_LEVEL ?? "info",
      port: process.env.PORT ?? "4000",
      databases: {
        main: {
          server: process.env.POSTGRES_HOST!,
          port: +process.env.POSTGRES_PORT!,
          user: process.env.POSTGRES_USER!,
          password: process.env.POSTGRES_PASSWORD!,
          database: process.env.POSTGRES_DB!,
        },
      },
    }),
  });
};

export default registerEnvironment;
