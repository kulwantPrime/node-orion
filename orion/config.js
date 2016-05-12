// Database configuration
/*var DaoConfig = {
	'connectionLimit' : 10,
	'host' : 'localhost',
	'user': 'root',
	'password' : 'paxcel@123',
	'database' : 'hibernate'
}

var mysql = require('mysql');

var db = mysql.createPool({
  connectionLimit : DaoConfig.connectionLimit,
  host            : DaoConfig.host,
  user            : DaoConfig.user,
  password        : DaoConfig.password,
  database : DaoConfig.database
});

module.exports = db;*/
exports.prop = require('./../main/config.js').prop;