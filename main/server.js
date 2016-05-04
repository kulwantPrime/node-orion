var config = require('./config.js');
var app = config.app;

// all the different urls will come here
var appServer = require('./../orion/route.js');
app.use('/orion',appServer);

exports.startServer = function(PORT){
	console.log('Server Started at ' + PORT);
	app.listen(PORT);
}