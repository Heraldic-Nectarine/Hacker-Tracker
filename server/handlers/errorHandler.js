module.exports = function(data,msg){
	msg = msg || "There was an error handling your request"
	return {success:false,message:msg,data:data};
}