var ReplayHandler = require('./replay/replayController.js');
var roomsController = require('./rooms/roomsController.js');

module.exports = function (router) {
  router.get('/api/rooms', roomsController.getRooms);
  router.post('/api/rooms', roomsController.saveRoom);
	router.get('/api/replays',ReplayHandler.getAllReplays);
	router.get('/api/replays/:owner/:title',ReplayHandler.getOneReplay);
	router.post('/api/replays',ReplayHandler.insertReplay);
	router.post('/api/replays/:owner/:title',ReplayHandler.deleteReplay);
	//router.put('/api/replays/:owner/:title',ReplayHandler.updateReplay);
}
