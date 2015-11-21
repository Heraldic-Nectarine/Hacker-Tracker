module.exports = function(req,res,next){
	console.log( 'Received ' + req.method + ' from ' + req.url )
	next();
};