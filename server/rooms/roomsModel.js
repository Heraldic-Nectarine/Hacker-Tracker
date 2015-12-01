var mongoose = require('mongoose');

var RoomUserSchema = new mongoose.Schema({
  userName: String,
},{_id: false});

var RoomAdminSchema = new mongoose.Schema({
  userName: String,
},{_id: false});

var RoomSchema = new mongoose.Schema({
  roomName: {type:String,required:true,unique:true},
  roomUsers: [RoomUserSchema],
  roomAdmins: [RoomAdminSchema]
});

module.exports = mongoose.model('Room', RoomSchema);
