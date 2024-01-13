import configureContainer from "./container";

const container = configureContainer();
const expressApp = container.cradle.express;
const httpPort = container.cradle.config.PORT;

async function main() {
  expressApp.listen(httpPort, () => {
    console.log(`Server listening on port ${httpPort}`);
  });
}

main();
