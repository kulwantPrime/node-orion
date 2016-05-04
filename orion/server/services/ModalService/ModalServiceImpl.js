/**
 * 
 */

var modaldao = require('./../../DAO/ModalDao.js');

var saveModal = function(data,cb){
	var localcb = function(err,response){
		if(err){
			cb(err,response);
		}else{
			cb(null,response);
		}
	};
	modaldao.saveModal(data,localcb);
	
}

var getModal = function(pagination,callback){
	var cb = function(data){
		//make json Object from data
		callback(data);
	}
	if(pagination.count == null){
		pagination.count = 10;
	}else{
		pagination.count = parseInt(pagination.count) ;
	}
	if(pagination.pageNumber == null){
		pagination.pageNumber = 1;
	}else{
		pagination.pageNumber = parseInt(pagination.pageNumber) ;
	}
	modaldao.getModal(pagination,cb);
}


exports.getModal = getModal;
exports.saveModal= saveModal;