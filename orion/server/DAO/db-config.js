// Database configuration
var DaoConfig = require('./../../../config.js').prop.orion.db;

var mysql = require('mysql');

var db = mysql.createPool({
  connectionLimit : DaoConfig.connectionLimit,
  host            : DaoConfig.host,
  user            : DaoConfig.user,
  password        : DaoConfig.password,
  database : DaoConfig.database
});

module.exports = db;