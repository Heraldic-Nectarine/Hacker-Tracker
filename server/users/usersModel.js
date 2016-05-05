var mongoose = require('mongoose');

var UserRoomSchema = new mongoose.Schema({
  name: String
}, { _id: false});

var AdminRoomSchema = new mongoose.Schema({
  name: String
}, { _id: false});

var UserSchema = new mongoose.Schema({
  firstName: {type:String,required:true},
  lastName: {type:String,required:true},
  email: {type:String,required:true,unique:true},
  password: {type:String,required:true},
  profilePic : {type:String,required:true}
});

module.exports = mongoose.model('User', UserSchema);
