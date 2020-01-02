require('dotenv').config();
const Env = require('./environment.config');

isTrueSetDebug = (Env.DEBUG === 'true');

module.exports = {
    development: {
        dialect: Env.DB_DIALECT,
        host: Env.DB_HOST,
        username: Env.DB_USERNAME,
        password: Env.DB_PASSWORD,
        database: (/.*\_dev/.test(Env.DB_NAME) ? Env.DB_NAME : `${Env.DB_NAME}_dev`),
        logging: isTrueSetDebug,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        }
    },
    test: {
        dialect: Env.DB_DIALECT,
        host: Env.DB_HOST,
        username: Env.DB_USERNAME,
        password: Env.DB_PASSWORD,
        database: (/.*\_test/.test(Env.DB_NAME) ? Env.DB_NAME : `${Env.DB_NAME}_test`),
        logging: isTrueSetDebug,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        }
    },
    production: {
        dialect: Env.DB_DIALECT,
        host: Env.DB_HOST,
        username: Env.DB_USERNAME,
        password: Env.DB_PASSWORD,
        database: Env.DB_NAME,
        logging: isTrueSetDebug,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        }
    }
};
