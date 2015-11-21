var ReplayHandler = require('./replay/replayController.js');

module.exports = function (router) { //might refactor to use _id
	router.get('/api/rooms', roomsController.getRooms);
	router.post('/api/rooms', roomsController.saveRoom);
	router.get('/api/replays',ReplayHandler.getAllReplays);
	router.get('/api/replays/:owner/:title',ReplayHandler.getOneReplay);
	router.post('/api/replays',ReplayHandler.insertReplay);
	router.delete('/api/replays',ReplayHandler.deleteReplay);
	router.put('/api/replays/:owner/:title',ReplayHandler.updateReplayTitle); //this is totes assuming you can update the coords or owner. So if they wanna do that, make a new replay. derp.
}
