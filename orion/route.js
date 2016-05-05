/**
 * @author Kulwant
 * 
 * Jul 1, 2015
 * 
 */

var app = require('./server.js');
var jwt = require('./../main/config.js').jwt;
var ORION = require('./../OrionConstants.js');

//ALL THE SERVICES WILL COME HERE
var userService = require('./server/services/UserService/UserServiceImpl.js');
var modalService = require('./server/services/ModalService/ModalServiceImpl.js');
var request = require('request');


app.get('/',function(req,res){
	console.log('req came');
	userService.getUserList(req,res);
});

app.post('/saveModel',function(req,res){
	console.log('req came');
	var data = req.body;
	/*console.log(data.status);
	console.log(JSON.parse(JSON.stringify(data)));*/
	var response = {
			statusResponse : "error",
			msg : null
	}
	var cb = function(err,data){
		if(err){
			response.msg = err;
			console.log(err);
		}else{
			response.statusResponse = "success";
			response.msg = data;
		}
		res.send(response);
		res.end();
	}
	modalService.saveModal(data,cb);
});

app.get('/model',function(req,res){
	 var pagination = {
	   'pageNumber' : req.query.pageNumber,
	   'count' : req.query.count
	 }
	 console.log(pagination);
	 var cb = function(data){
	  return res.send(data);
	 };
	 modalService.getModal(pagination,cb);
	});

// token from api will be stored in server side for use by eclipse 
app.post('/loginConnect',function(req,res){
	console.log(req.body);
	var statusResponse = 'error';
	var message = 'User Not Found';
	var user = {
		'name' : req.body.username,
		'pass' : req.body.password
	}
	var url = {
			url: ORION.APIS.USER_AUTH,
			headers: {
			    'Authorization': 'Basic ' + new Buffer(user.name + ":" + user.pass).toString('base64')
			}
	};
	request(url,function(err,data){
		if(err){
			res.send({resultStatus : statusResponse, msg : message});
			return console.log(err);
		}
		statusResponse = 'success';
		message = 'User Found';
		return res.send({resultStatus : statusResponse, msg : data});
	});
})

app.post('/userDetails',function(req,res){
	console.log(req.body);
	var statusResponse = 'error';
	var message = 'User Not Found';
	var user = {
		'token' : req.body.token
	}
	var url = {
			url: ORION.APIS.USER_DETAIL,
			headers: {
			    'Authorization': 'Session ' + user.token
			}
	};
	request(url,function(err,data){
		if(err){
			res.send({resultStatus : statusResponse, msg : err});
			return console.log(err);
		}
		statusResponse = 'success';
		message = 'User Found';
		return res.send({resultStatus : statusResponse, msg : data});
	});
})

app.post('/login',function(req,res){
	console.log(req.body);
	var user = {
		'name' : req.body.username,
		'pass' : req.body.password
	}
	var cb = function(err,data){
		if(err){
			return res.status(500).send({responseStatus:'error',msg:err});
		}
		var statusResponse = 'error';
		var message = 'User Not Found';
		console.log(data);
		if(data.status === 1){
			req.session.user = user.name;
			statusResponse = 'success';
			message = 'User Found';
		}
		var dataToToken = ORION.TOKEN_DATA();
		dataToToken.name = user.name;
		console.log(dataToToken);	
		jwt.sign(dataToToken, function(err,token){
			console.log(token);
			console.log(err);
			return res.send({resultStatus : statusResponse, msg : message, token : token});			
		});
	}
	userService.checkUser(user,cb);
})


app.get('/checkAuthenticationToken',function(req,res){

	var responseStatus = 'error';
	var message = 'access denied';
	
	/*var token = req.body.token || req.query.token || req.headers['Authorization'];*/
	var token = req.headers['authorization'];
	
	// decode token
	if (token) {
		console.log(token);
		
	    // verifies secret and checks exp
	    jwt.verify(token, function(err, decoded) {      
	      if (err) {
		      console.log(err);
	        return res.status(403).send({responseStatus:responseStatus,msg : err});   
	      } else {
	        // if everything is good, save to request for use in other routes
	        req.session.user = decoded;	        
	        responseStatus = 'success';
	        message = 'Authenticated';
	        res.send({responseStatus:responseStatus,msg : message, data : decoded});
	      }
	    });
	  }else{
		return  res.send({responseStatus:responseStatus,msg : message});
	  }
})

app.use(function(req,res,next){
	
	var responseStatus = 'error';
	var message = 'access denied';
	
	if(req.session.user){
		return next();
	}else{
		res.status(403).send({responseStatus:responseStatus,msg : message});
	}

})


app.post('/checkAuthentication',function(req,res){
	console.log(req.body);
	var responseStatus = 'success';
	var message = 'Authenticated';

	res.send({responseStatus:responseStatus,msg : message});
})
app.get('/checkAuthentication',function(req,res){

	var responseStatus = 'success';
	var message = 'Authenticated';
	
	res.send({responseStatus:responseStatus,msg : message});
})


app.get('/logout',function(req,res){
	
	var responseStatus = 'error';
	var message = 'access denied';
	
	req.session.destroy(function(err){
		if(err){
			return res.send({responseStatus:responseStatus,msg : message});
		}
		responseStatus = 'success';
		message = 'User loggedout';
		res.send({responseStatus:responseStatus,msg : message});
	});
})

module.exports = app;