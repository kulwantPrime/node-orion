var db = require('./db-config.js');

var getUserList = function(cb){
	// db.getConnection(function(err, connection) {
	  // // connected! (unless `err` is set) 
	  // console.log(err);
		db.query('select * from users',function(err,row){
			if(err){
				console.log(err);
				return 	cb(err);
			}
			cb(row);
		});
	// });
}

var checkUser = function(user,cb){
	// db.getConnection(function(err, connection) {
	  // // connected! (unless `err` is set) 
	  // console.log(err);
		var response = {
			status : 0
		}
		db.query('select * from users where `username` = ? and `password` = ?',[user.name,user.pass],function(err,row){
			if(err){
				cb(err,response);
				return console.log(err);
			}
			console.log(row);
			if(row.length > 0){
				response.status = 1;
				cb(null,response);
			}else{
				response.status = 0;
				cb(null,response);
			}
			//cb(row);
		});
	// });
}

exports.getUserList = getUserList;
exports.checkUser = checkUser;