

var ReplayHandler = require('./replay/replayController.js');




module.exports = function (router) {


	router.get('/api/replays',ReplayHandler.getAllReplays);
	router.get('/api/replays/:owner/:title',ReplayHandler.getOneReplay);
	router.post('/api/replays',ReplayHandler.insertReplay);
	router.post('/api/replays/:owner/:title',ReplayHandler.deleteReplay);
	router.put('/api/replays/:owner/:title',ReplayHandler.updateReplay);


}