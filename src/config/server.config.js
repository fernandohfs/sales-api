import Hapi from '@hapi/hapi';
import HapiSequelize from 'hapi-sequelizejs';
import HapiRouter from 'hapi-router';

//Swagger
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

import Database from './database.config';
import Env from './environment.config';

class Server {
  constructor() {
    this.server = Hapi.server({
      port: Env.PORT,
      host: Env.HOST,
      debug: {
        request: ['error'],
      },
    });
  }

  async start() {
    const { server } = this;

    await this._plugins();
    await server.initialize();
    await server.start();

    console.log(`\n\nServer running on ${server.info.uri}`);
    return server;
  }

  async _plugins() {
    await this.server.register([
      //Swagger
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: {
          info: {
            title: 'API Sales Documentação',
            version: Env.VERSION,
          }
        }
      },
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
      }
    ]);
  }
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

export default new Server();
