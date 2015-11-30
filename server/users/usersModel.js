var mongoose = require('mongoose');

var UserRoomSchema = new mongoose.Schema({
  name: String
}, { _id: false});

var AdminRoomSchema = new mongoose.Schema({
  name: String
}, { _id: false});

var UserSchema = new mongoose.Schema({
  firstNmae: String,
  lastName: String,
  email: String,
  password: String,
  profilePic : String
});

module.exports = mongoose.model('User', UserSchema);
