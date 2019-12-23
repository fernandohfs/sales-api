import { Sequelize } from 'sequelize';

import dbMigrationConfig from './database.migrations.config';

class Database {
  constructor() {
    this._sequelize = null;
  }

  async getConn() {
    if (!this._sequelize) {
      this._sequelize = new Sequelize(
        dbMigrationConfig.database,
        dbMigrationConfig.username,
        dbMigrationConfig.password,
        dbMigrationConfig
      );
    }

    return this._sequelize;
  }
}

export default new Database();
