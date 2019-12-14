require = require("esm")(module);
const server = require("./config/server.config");

server.default.start();
