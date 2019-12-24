const {
  NODE_ENV = 'development',
  HOST = 'localhost',
  PORT = 3333,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DIALECT,
} = process.env;

module.exports = {
  ENV: NODE_ENV,
  HOST,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DIALECT,
};
