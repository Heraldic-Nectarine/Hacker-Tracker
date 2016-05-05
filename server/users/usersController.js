var User = require('./usersModel.js');
var bcrypt = require('bcrypt');
var _error = require("../handlers/errorHandler.js");
var _success = require("../handlers/successHandler.js");

function _buildErrorResponse (errorObj) { //for multiple missing fields in mongo
  var response = [];
  for(var err in errorObj.errors){
    response.push(_error(errorObj.errors[err].message));
  }
  return response;
}

function _hashUserPassword (userObj,cb) {
  bcrypt.genSalt(10, function(err, salt) {
    if(err) return cb(err);
    bcrypt.hash(userObj.password, salt, function(err, hash) {
      if(err) return cb(err);
      userObj.password = hash;
      cb(null,userObj);
    });
  });
}

function _createSession (responseObj) {
  //do something?
  return responseObj;
}

module.exports = {

  logout: function (req,res) { //this literally does nothing atm.
    req.session.destroy(function(err){
      res.status(404).send(_error("LOGOUT"));
    });
    res.send(_success("You have been successfully logged out"));
  },

  login: function (req, res) { //assumes {email:"something",password:"somethingElse"}
    console.log(req.body.email.email);
    User.find({email:req.body.email.email},function(err,result){
      if(err) return res.status(404).send(_error("FINDUSER"));
      if(result.length === 0) return res.status(404).send(_error("User does not exist!"));
      bcrypt.compare(req.body.email.password,result[0].password,function(err,isPassword){
        if(err) return res.status(404).send(_error("HASHCOMPARE"));
        if(!isPassword) return res.status(404).send(_error("Password invalid"));
        result = result[0];
        req.session.user = result; //this totally stores the user pwd as well.
        return _createSession(res).send(_success({firstName:result.firstName,email:result.email,profilePic:result.profilePic,id:result._id})); //whatever we want there
      });
    });
  },

  signup: function (req, res) {
    var newUser = new User(req.body); //assumes {firstName: '...',lastName:'...',email:'...',password:'...',profilePic:'...' }
    newUser.validate(function(err){
      if(err) return res.status(404).send(_buildErrorResponse(err));
      _hashUserPassword(newUser,function(err,hashedUser){
        if(err) return res.status(404).send(_error("HASHPWD"));
        hashedUser.save(function(err,response){
          if(err) {
            if(err.message.indexOf("duplicate key error index") !== -1) return res.status(404).send(_error("Email is already in use"));
            return res.status(404).send(_error("USERSAVE"));
          }
          delete response.password; //dont want to send hashed password back, shouldnt matter though
          res.send(_success(response));
        });
      });
    });
  }
}
