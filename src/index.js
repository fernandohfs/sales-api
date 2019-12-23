require('dotenv').config();

// eslint-disable-next-line no-global-assign
require = require('esm')(module);
const server = require('./config/server.config');

server.default.start();
