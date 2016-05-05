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


/*
 * use other middlewares for app will come here
 *
*/
app.use(expressSession(sessionOptions));
app.use(cors(corsOptions));

console.log(!prop.orion["api-logging"]);
console.log("===========================================================");
console.log("API Logging status");

if(prop.orion["api-logging"] == null || !prop.orion["api-logging"]){
	
	console.log("You have turned off the API Logging");
	console.log("To Turn it on, please use api-logging variable in application properties file");
	
}else{
	
	console.log("API Logging turned ON");
	console.log("To Turn it off, please delete api-logging variable in application properties file or set it's status to false");
	
	if(config.env === "dev"){
		
		console.log("===========================================================");
		console.log("TERMINAL Logging");
		app.use(reqLogger(prop.orion["req-logger"]));
		console.log("===========================================================");
		
	}else{
		
		var FileStreamRotator = require('file-stream-rotator');
		var fs = require('fs');
		var logDirectory = !!prop.orion["req-logger-path"] ? prop.orion["req-logger-path"]:__dirname + '/log';
		
		console.log("===========================================================");
		
		console.log("Directory path for API logging : ----");
		console.log(logDirectory);
		console.log("===========================================================");
		
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