module.exports = function(data,msg){
	msg = msg || "Your request was handled successfully"
	return {success:true,message:msg,data:data};
}