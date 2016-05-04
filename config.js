exports.PORT = 3000;

exports.sessionsecret = "orioneclipse";

//for process.argv
process.argv.forEach(function (val, index, array) {
  /*console.log(index + ': ' + val);*/
  var arg = val.split("=");
  if(arg.length > 0)
	  if(arg[0] === 'prop'){
		console.log(require('./'+arg[1]+'.json'));
		exports.prop = require('./'+arg[1]+'.json');
		exports.env = arg[1];
	  }
});