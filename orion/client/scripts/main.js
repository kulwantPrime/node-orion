
var startSocketConnection = function(){
	var username = $('.usernameInput').val();
	console.log(username);
	
	var socket = io.connect('http://localhost:3000/chat');
	socket.on('getnickname', function (data) {
		socket.emit('nickname', { 'name': 'singh' });
		socket.emit('data',{'sender' : 'singh','receiver' : 'kulwant','msg' : 'i love u'});
	});
	socket.on('data',function(data){
		console.log(data);
	})

}

var setUsernNameToCookie = function(username){
	document.cookie = 'username='+username;
}




