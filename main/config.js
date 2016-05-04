/**
 *main server config file
 */

var config = require("./../config.js");
var sessionkey = config.sessionsecret;
var prop = config.prop;

var express = require('express');
var cors = require('cors');
var expressSession =  require('express-session');
var jwt = require('jsonwebtoken');
var reqLogger = require("morgan");
var app = express();

var sessionOptions = {
		
		/*
		 * cookie key name 
		*/
		/*name : 'orion.uid',*/
		
		
		'secret' : sessionkey,
		
		/*
		 * when there is change in session than by default it will reflect in session store
		 * but if we want to update session upon every request than we can use resave true,  this will be helpfull when session store associates expire time with session
		 * 
		*/
		resave: false,
		
		/*
		 * whenever new session is created store it in sessions store even if no data is associated with it 
		 * if set to true, than when just hits the server new session is created and stored in session store
		 * 
		*/

		saveUninitialized : false
}

var corsOptions = {
		origin: prop.orion["allowed-origins"],
		credentials : true
};

console.log(corsOptions.origin);


// use other middlewares for app will come here

app.use(expressSession(sessionOptions));
app.use(cors(corsOptions));


if(config.env === "dev"){
	app.use(reqLogger(prop.orion["req-logger"]));	
}else{
	
	var FileStreamRotator = require('file-stream-rotator');
	var fs = require('fs');
	var logDirectory = !!prop.orion["req-logger-path"] ? prop.orion["req-logger-path"]:__dirname + '/log';
	
	console.log("Application logging happens at");
	console.log(logDirectory);
	
	// ensure log directory exists
	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

	// create a rotating write stream
	var accessLogStream = FileStreamRotator.getStream({
	  date_format: 'YYYYMMDD',
	  filename: logDirectory + '/access-%DATE%.log',
	  frequency: 'daily',
	  verbose: false
	})

	app.use(reqLogger(prop.orion["req-logger"], {stream: accessLogStream}));
}
exports.app = app;
exports.jwt = {
	"sign" : function(data,cb){
		var token;
		var err=null;
		try{
			token = jwt.sign(data,sessionkey);
		}catch(error){
			err = err;
		}
		cb(err,token);
	},"verify" : function(data,cb){
		jwt.verify(data, sessionkey,cb);
	}
}