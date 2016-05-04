/**
 * Authentication file
 */


exports.mainAuthenticator = function(onlineClients,cookie){
	var status = false;
	if(checkUserExistsInOnlineClients(onlineClients,cookie.username))
		status = true;
	
	return status;
}

function checkUserExistsInOnlineClients(onlineClients,username){
	var status = true;
	
	if(onlineClients.has(username)){
		status = false;
	}
	
	return status;
}