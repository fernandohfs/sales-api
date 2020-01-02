import Hapi from '@hapi/hapi';
import HapiSequelize from 'hapi-sequelizejs';
import HapiRouter from 'hapi-router';

import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

import Auth from './auth.config';

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

    if (Env.DEBUG === 'true') {
        console.log(`\n\nServer running on ${server.info.uri}`);
    }
    
    return server;
  }

  async _plugins() {
    const server = this.server;

    await server.register([
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
        }
      },
      {
        plugin: Auth
      },
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: {
          info: {
            title: 'API Sales Documentation',
            version: Env.VERSION,
          },
          securityDefinitions: {
            'jwt': {
              'type': 'apiKey',
              'name': 'Authorization',
              'in': 'header'
            }
          },
          security: [{ 'jwt': [] }]
        }
      },
    ]);
  }
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

export default new Server();
