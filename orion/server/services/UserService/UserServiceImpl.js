var dao = require('./../../DAO/UserDao.js');


var getUserList = function(req,res){
	var cb = function(data){
		return res.send(data);
	}
	dao.getUserList(cb);
}

var checkUser = function(user,cb){
	dao.checkUser(user,cb);
}

exports.getUserList = getUserList;
exports.checkUser = checkUser;