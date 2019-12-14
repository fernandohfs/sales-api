import Hapi from "@hapi/hapi";

class Server {
  async init() {
    const server = Hapi.server({
      port: 3333,
      host: "localhost"
    });

    await server.initialize();

    return server;
  }

  async start() {
    const server = await this.init();

    await server.start();

    console.log(`\n\nServer running on ${server.info.uri}`);

    return server;
  }
}

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

export default new Server();
