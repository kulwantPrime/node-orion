// application server config

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//ALL THE MIDLLEWARES FOR MODULE WILL COME HERE
app.use('/public',express.static(__dirname + '/client/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

module.exports = app;
