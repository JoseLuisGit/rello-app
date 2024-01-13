import express, { Express, Router } from "express";
import { AwilixContainer, asFunction } from "awilix";
import requestContextBinder from "@app/restapi/globalMiddleware/requestContextBinder";
import {
  requestError,
  requestLogger,
} from "@app/restapi/globalMiddleware/requestLogger";
import context from "@app/logger/context";

export interface IRestAPICradle {
  router: Router;
  express: Express;
}

function registerRestAPI(container: AwilixContainer<IRestAPICradle>) {
  container.register({
    router: asFunction(() => {
      const router = Router();
      router.use(express.json());
      router.get("/", (_, res) => {
        context.set("case_id", "213");
        res.json({ message: "Hello World" });
      });
      return router;
    }),
    express: asFunction(({ router }) => {
      const app = express();
      app.use(requestContextBinder);
      app.use(requestLogger);
      app.use("/api", router);
      app.use(requestError);
      return app;
    }).singleton(),
  });
}

export default registerRestAPI;
