var Rooms = require('./roomsModel.js');

module.exports = {
  
  getRooms: function (req, res, next){
   Rooms.find({}, function (err, rooms){
    console.log("getting rooms", rooms);
      res.json(rooms);
    });
  }, 

  saveRoom: function (req, res, next){
    //need to add users allowed in room
    var room = req.body.roomName;
    Rooms.create({roomName: room}, function (newRoom){
      res.status(201);
      res.send(newRoom);
    });
  }
}
