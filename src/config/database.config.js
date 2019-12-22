import { Sequelize } from 'sequelize';

class Database {
    constructor() {
        this._sequelize = null;
        this.dialect = "mysql";
        this.host = "localhost";
        this.username = "root";
        this.password = "";
        this.database = "sales";
    }

    async getConn() {
        if (! this._sequelize) {
            this._sequelize = new Sequelize(this.database, this.username, this.password, {
                dialect: this.dialect
            });
        }

        return this._sequelize;
    }
}

export default new Database();