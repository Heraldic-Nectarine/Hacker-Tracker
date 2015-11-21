
var mongoose = require('mongoose');

var TripSchema = new mongoose.Schema({
  created : { type : Date, default : Date.now },
  owner: {type: String,required:true},
  title: {type: String,required:true}, // so you do stuff like: "My Walk through the park..."
  path:[
    
    {
      lat:String,
      lng:String
    }

  ]
});

module.exports = mongoose.model('Trip', TripSchema);

