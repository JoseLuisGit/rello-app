import { AwilixContainer, asValue } from "awilix";

export type Environment = {
  LOG_LEVEL: string;
  PORT: string;
};

export interface IEnvCradle {
  config: Environment;
}

const registerEnvironment = (container: AwilixContainer) => {
  container.register({
    config: asValue({
      LOG_LEVEL: process.env.LOG_LEVEL ?? "info",
      PORT: process.env.PORT ?? "3000",
    }),
  });
};

export default registerEnvironment;
