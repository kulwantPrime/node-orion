var config = require('./config.js');
var server = require('./main/server.js');

server.startServer(config.PORT);