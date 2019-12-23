import Hapi from '@hapi/hapi';
import HapiSequelize from 'hapi-sequelizejs';
import HapiRouter from 'hapi-router';
import Database from './database.config';

class Server {
  constructor() {
    this.server = Hapi.server({
      port: 3333,
      host: 'localhost',
    });
  }

  async start() {
    const { server } = this;

    await server.initialize();
    await server.start();
    await this._plugins();

    console.log(`\n\nServer running on ${server.info.uri}`);
    return server;
  }

  async _plugins() {
    await this.server.register([
      {
        plugin: HapiSequelize,
        options: [
          {
            name: 'sales',
            models: ['./src/api/**/**.models.js'],
            sequelize: await Database.getConn(),
          },
        ],
      },
      {
        plugin: HapiRouter,
        options: {
          routes: 'src/api/**/**.routes.js',
        },
      },
    ]);
  }
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

export default new Server();
