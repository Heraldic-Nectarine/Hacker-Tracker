var Replay = require('./replayModel.js');

module.exports = {

	getAllReplays:function ( req,resp ) {
		console.log("GET REQUEST --- GetAllReplays --- ");
		var options = {};
		var limit = req.params.limit || 20; // <--default num of response.  Change if youre complaining atm.
		if ( req.params.owner ) options.owner = req.params.owner;
		if ( req.params.beforeDate && req.params.afterDate ) {
			options.created = { $gt : afterDate, $lt : beforeDate };
		}else if(req.params.beforeDate) {
			options.created = { $lt : beforeDate };
		}else if(req.params.afterDate) {
			options.created = { $gt : afterDate };
		}

		Replay.find(options).limit(limit).exec(function ( err,response ) {
			if(err) {
				console.log("=-=-=-=-=-=-=-=-=GET-ALL-REPLAYS=-=-=-=-=-=-=-=-= \n",err);
				return resp.send("Something went wrong. GETALLREPLAYS",404);
			}
			resp.send(response);
		});
	},

	getOneReplay:function (req, resp) { // currently only finds by the `title` of the replay and most recent if `owner` only

		options = {};
		if(req.params.title) options.title = req.params.title;
		if(req.params.owner) options.owner = req.params.owner;
		Replay.findOne(options).exec(function(err,response){
			if(err){
				console.log("=-=-=-=-=-=-=-=-=GET-ONE-REPLAY=-=-=-=-=-=-=-=-= \n",err);
				return resp.send("Something went wrong. GETONEREPLAY",404);
			}
			resp.send(response);
		});

	},

	insertReplay:function (req, resp) { //assumes payload resembles `{owner:'someone',title:'myStupidTitle',"path":"[{"lat":"123.33","lng":"321.44"},{"lat":"123.33","lng":"321.44"},{"lat":"123.33","lng":"321.44"}]"}`

		var newReplay = new Replay(req.body);
		newReplay.save(function(err,replayObj){

			if(err){
				console.log("=-=-=-=-=-=-=-=-=INSERT-REPLAY=-=-=-=-=-=-=-=-= \n",err);
				return res.send("Something went wrong. INSERTREPLAY",404);
			}
			console.log("Success");
			resp.send(replayObj);
		});

	},

	deleteReplay:function (req, resp) { //assumes either {owner:'Some stupid owner', title: 'Some stupid title'} OR maybe something with an id. Will make test soon.

		Replay.find({owner:req.body.owner,title:req.body.title}).remove(function(err,response){
			if(err){
				console.log("=-=-=-=-=-=-=-=-=DELETE-REPLAY=-=-=-=-=-=-=-=-= \n",err);
				return res.send("Something went wrong. DELETEREPLAY",404);
			}
			resp.send(response);
		});

	},

	updateReplayTitle:function (req,resp) {
		console.log("Params", req.params)
		Replay.findOne({owner:req.params.owner,title:req.params.title},function(err,replayObj){
			if(err){
				console.log("=-=-=-=-=-=-=-=-=UPDATE-REPLAY=-=-=-=-=-=-=-=-= \n",err);
				return resp.send("Something went wrong. UPDATE-REPLAY-FIND",404);
			}
			var newTitle = req.body.newTitle;
			replayObj.title = newTitle;
			replayObj.save(function(err,obj){
				if(err){
					return resp.send("Something went wrong. UPDATE-REPLAY-SAVE",404)
				}
				resp.send(obj);
			});
		});
	} 
}