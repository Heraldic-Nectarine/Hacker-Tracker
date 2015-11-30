var User = require('./usersModel.js');
var bcrypt = require('bcrypt');



function _buildErrorResponse (errorObj) {
  var response = [];
  for(var err in errorObj.errors){
    response.push(errorObj.errors[err].message);
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

  //do something to make a session
  //return the response obj
}



module.exports = {

  login: function (req, res) { //assumes {email:"something",password:"somethingElse"}
    User.find({email:req.body.email},function(err,result){
      if(err) return console.log("errrrrr",err);
      if(result.length === 0) return console.log("User does not exist!");
      bcrypt.compare(req.body.password,result[0].password,function(err,result){
        if(err) return res.status(404).send("There was an error handling your request - HASHCOMPARE");
        if(!result) return res.status(404).send("Password invalid.");
        return _createSession(res).send(); //whatever we want there
      });
    })
  },

  signup: function (req, res) {
    var newUser = new User(req.body); //assumes {firstName: '...',lastName:'...',email:'...',password:'...',profilePic:'...' }
    newUser.validate(function(err){
      if(err) return res.status(404).send(_buildErrorResponse(err));
      _hashUserPassword(newUser,function(err,hashedUser){
        if(err) return res.status(404).send("There was error handling your request - HASHPWD");
        hashedUser.save(function(err,response){
          if(err) {
            if(err.message.indexOf("duplicate key error index") !== -1) return res.status(404).send(_buildErrorResponse({err:{message:"Email is already in use"}}));
            return res.status(404).send("There was an error handling your response - USERSAVE");
          }
          delete response.password; //dont want to send hashed password back, shouldnt matter though
          res.send(response);
        });
      });
    });
  }
}

// // var testUser = {body:{firstName: 'TESTBVALUES',lastName:'TESTBVALUES',email:'TESTBVALUES',password:'pwd',profilePic:'TESTBVALUES' }};
// var testLoginObj = {body:{email:"TESTBVALUES",password:"pwdasdasd"}}
// // console.log(module.exports.signup(testUser));
// console.log(module.exports.login(testLoginObj))