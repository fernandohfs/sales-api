import { Sequelize } from 'sequelize';

import dbMigrationConfig from './database.migrations.config';
import Env from './environment.config';

class Database {
  constructor() {
    this._sequelize = null;
  }

  async getConn() {
    let dbConfig = dbMigrationConfig[Env.ENV];

    if (!this._sequelize) {
      this._sequelize = new Sequelize(
        dbConfig.database,
        dbConfig.username,
        dbConfig.password,
        dbConfig
      );
    }

    return this._sequelize;
  }
}

export default new Database();
