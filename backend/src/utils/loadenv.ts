import { config } from "dotenv";

const { NODE_ENV = "production" } = process.env;

const resolverFileName = (env: string) => {
  if (env.trim().toLowerCase() === "test") {
    return ".env.test";
  }
  return ".env";
};

export default config({ path: resolverFileName(NODE_ENV) });
