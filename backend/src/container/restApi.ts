import express, { Express, Router } from "express";
import { AwilixContainer, Lifetime, asClass, asFunction } from "awilix";
import requestContextBinder from "@app/restapi/globalMiddleware/requestContextBinder";
import {
  requestError,
  requestLogger,
} from "@app/restapi/globalMiddleware/requestLogger";
import ErrorHandler from "@app/restapi/routes/middlewares/errors";
import { AuthController } from "@app/restapi/routes/api/authController";
import { AuthStore } from "@app/datastore/authStore";
import { UserController } from "@app/restapi/routes/api/userController";

export interface IRestAPICradle {
  router: Router;
  express: Express;
  errorHandler: any;
  authController: AuthController;
  userController: UserController;
}

function registerRestAPI(container: AwilixContainer<IRestAPICradle>) {
  container.register({
    authController: asFunction(({ authStore }: { authStore: AuthStore }) => {
      return new AuthController(authStore);
    }),
    userController: asClass(UserController).classic().setLifetime(Lifetime.SINGLETON),
    errorHandler: asFunction(() => {
      return ErrorHandler();
    }),

    router: asFunction(({ authController, userController }: { authController: AuthController, userController: UserController}) => {
      const router = Router();
      router.use(express.json());
      router.get("/", (_, res) => {
        res.json({ message: "Hello World" });
      });

      router.use("/auth", authController.getRouter());
      router.use("/users", userController.getRouter());
      return router;
    }),
    express: asFunction(({ router, errorHandler }) => {
      const app = express();
      app.use(requestContextBinder);
      app.use(requestLogger);
      app.use("/api", router);
      app.use(errorHandler);
      app.use(requestError);
      return app;
    }).singleton(),
  });
}

export default registerRestAPI;
