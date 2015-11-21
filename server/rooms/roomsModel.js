var mongoose = require('mongoose');

var RoomUsersSchema = new mongoose.Schema({
  userName: String,
},{_id: false});

var RoomSchema = new mongoose.Schema({
  roomName: String,
  roomUsers: [RoomUsersSchema]
});

module.exports = mongoose.model('RoomSchema', RoomSchema);
