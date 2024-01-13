import { InjectionMode, createContainer } from "awilix";
import registerEnvironment, { IEnvCradle } from "./environment";
import registerRestAPI, { IRestAPICradle } from "./restApi";

export interface ContainerCradle extends IEnvCradle, IRestAPICradle {}

const configureContainer = () => {
  const container = createContainer<ContainerCradle>({
    injectionMode: InjectionMode.PROXY,
  });
  registerEnvironment(container);
  registerRestAPI(container);
  return container;
};

export default configureContainer;
