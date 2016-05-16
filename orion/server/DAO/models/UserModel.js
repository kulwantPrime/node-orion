var store = require('./../db-config.js').store;

var Document = store.defineResource({
	  name: 'coffeeshop'
});
exports.getUserList = function(cb){
		console.log("in userlis tof model");
		Document.findAll({limit:10}).then(function (document) {
			cb(document);
		});
}

// bypass the data store