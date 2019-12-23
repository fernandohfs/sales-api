require('dotenv').config();
const Env = require('./environment.config');

module.exports = {
  dialect: Env.DB_DIALECT,
  host: Env.DB_HOST,
  username: Env.DB_USERNAME,
  password: Env.DB_PASSWORD,
  database: Env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
