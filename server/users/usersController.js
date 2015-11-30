var Users = require('./usersModel.js');

module.exports = {

  loginHandler: function (req, res) {
    //req.body.userName

    //req.body.password

    //req.body.profilePic

    //how do we handle the id?
  },

  signupHandler: function (req, res) {

  },
  
  getRooms: function (req, res, next){
   Rooms.find({}, function (err, rooms){
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



