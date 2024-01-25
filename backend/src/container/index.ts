import { InjectionMode, createContainer } from "awilix";
import registerEnvironment, { IEnvCradle } from "./environment";
import registerRestAPI, { IRestAPICradle } from "./restApi";
import registerDatabase, { IDatabaseCradle } from "./database";

export interface ContainerCradle
  extends IEnvCradle,
    IRestAPICradle,
    IDatabaseCradle {}

const configureContainer = () => {
  const container = createContainer<ContainerCradle>({
    injectionMode: InjectionMode.PROXY,
  });
  registerEnvironment(container);
  registerDatabase(container);
  registerRestAPI(container);

  return container;
};

export default configureContainer;
