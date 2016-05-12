/*
 * Port to run Node server on
 * 
*/
exports.PORT = 3001;

/*
 * session secret used in case of express session 
 * and jwt token encoding.
 * 
*/
exports.sessionsecret = "orioneclipse";

//for process.argv
process.argv.forEach(function (val, index, array) {
  /*console.log(index + ': ' + val);*/
  var arg = val.split("=");
  if(arg.length > 0){
	  if(arg[0] === 'prop'){

		  console.log("===========================================================");
		  console.log("Using " + arg[1] + ".json File and it's content is" );
		  console.log(require('./'+arg[1]+'.json'));
		  console.log("===========================================================");
		  exports.prop = require('./'+arg[1]+'.json');
		  exports.env = arg[1];

	  }	  
  }
});