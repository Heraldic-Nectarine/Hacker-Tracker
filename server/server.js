var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressRouter = express.Router();
var db = require('./db.js');
var router = require('./router.js');

require('./config/middleware.js')(app, express);

router(expressRouter);
app.use('/',expressRouter);
server.listen(port);

var currentUsersInRoom = {};

io.on('connection', function (socket) {
  console.log('I\'ve received a connection!');

  socket.on('connectToRoom', function (room) {
    var currentRoom = room;
    //console.log("room on server", currentRoom);
    socket.join(currentRoom);

    var users = {};
    
    socket.on('userData', function (user) {
      console.log("user coming in ", user);
      users[user.id] = user;
      currentUsersInRoom[currentRoom] = users; // currenUsersInRoom = {<room name>:{id : {id: <id>, userName: <>, userPic: <>, latitude: <>, longitude: <> }}
      console.log(currentUsersInRoom);
      console.log("current room on server", currentRoom);
      io.in(currentRoom).emit('serverData', currentUsersInRoom);
    });

    socket.on('logout', function (user) {
      delete currentUsersInRoom[currentRoom][user.id];
      socket.leave(currentRoom);
      io.in(currentRoom).emit('serverData', currentUsersInRoom);
    })
  });
});

module.exports = app;
