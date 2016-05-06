/**
 * 
 */

var ms = require('ms');

var APIS = {
	'USER_AUTH' : 'https://testapi.orionadvisor.com/api/v1/security/token',
	'USER_DETAIL' : 'https://testapi.orionconnect.com/api/v1/Authorization/User'
};

var TOKEN_EXPIRE_DATE = ms("10h");

var TOKEN_DATA = function(){
	return {
		"iss": "Orion",
		"aud": "http://session.orion",
		"exp": Date.now()/1000 + ms("10h"),
		"nbf": Date.now()/1000
	};
};

exports.APIS = APIS;
exports.TOKEN_DATA = TOKEN_DATA;