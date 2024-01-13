import configureContainer from "@app/container";
import logger from "@app/logger";
import "@app/utils/loadenv";

const container = configureContainer();
const expressApp = container.cradle.express;
const httpPort = container.cradle.config.port;

async function main() {
  expressApp.listen(httpPort, () => {
    logger.info(`Server listening on port ${httpPort}`);
  });
}

main();
