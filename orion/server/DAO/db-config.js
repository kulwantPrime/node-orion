// Database configuration
var DaoConfig = require('./../../config.js').prop.orion.db;

var mysql = require('mysql');

var db = mysql.createPool({
  connectionLimit : DaoConfig.connectionLimit,
  host            : DaoConfig.host,
  user            : DaoConfig.user,
  password        : DaoConfig.password,
  database : DaoConfig.database
});



var JSData = require('js-data');
var DSSqlAdapter = require('js-data-sql');

var store = new JSData.DS();
// see http://knexjs.org/#Installation-client for more details on the configuration options 
var adapter = new DSSqlAdapter({
  client: 'mysql', // or "pg" or "sqlite3"
  connection: {
    host: DaoConfig.host,
    user: DaoConfig.user,
    password: DaoConfig.password,
    database: DaoConfig.database
  }
});

store.registerAdapter('sql', adapter, { default: true });
console.log(store);
module.exports.store = store;
module.exports.db = db;