var Room = require('./roomsModel.js');
var _error = require("../handlers/errorHandler.js");
var _success = require("../handlers/successHandler.js");

module.exports = {

  deleteRoom:function (req,res) { //assumes {roomName:'Foo', id:"something"} USERS ID!!!! NOT ROOM ID
    Room.find({roomName:req.body.roomName},function(err,success){
      if(err) return res.status(404).send(_error(err));
      if(success.roomAdmins.indexOf(req.body.id) === -1) return res.status(404).send(_error("You are not authorized to perform this action"));
      success.remove(function(err,response){
        if(err) return res.status(404).send(_error(err));
        res.send(_success(response));
      });
    });
  },
  
  getRooms: function (req, res){
   Room.find({}, function (err, rooms){
      if(err) return res.status(404).send(_error(err));
      res.send(_success(rooms));
    });
  }, 

  saveRoom: function (req, res){ //assumes {roomName:'Foo', id:"something"} USERS ID!!!! NOT ROOM ID
    var newRoom = new Room({roomName: req.body.roomName});
    newRoom.roomAdmins.push({userId:req.body.id});

    newRoom.save(function (err,newRoom){
      if(err) return res.status(404).send(_error(err));
      res.send(_success(newRoom));
    });
  }
}
