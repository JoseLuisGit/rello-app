import configureContainer from "@app/container";
import logger from "@app/logger";

const container = configureContainer();
const expressApp = container.cradle.express;
const httpPort = container.cradle.config.PORT;

async function main() {
  expressApp.listen(httpPort, () => {
    logger.info(`Server listening on port ${httpPort}`);
  });
}

main();
