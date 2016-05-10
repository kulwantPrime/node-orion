
console.log("===========================================================");
console.log("===========================================================");
console.log("===========================================================");

var config = require('./ApplicationConstants.js');
var server = require('./main/server.js');

server.startServer(config.PORT);