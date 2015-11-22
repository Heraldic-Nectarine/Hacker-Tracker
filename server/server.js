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

var currentUsersInRoom = [];
var currentRoom = "";

io.on('connection', function (socket) {

  socket.on('connectToRoom', function (room) {
    console.log("room on server", room);
    socket.join(room);
    socket.on('userData', function (user) {
      currentUsersInRoom.push(user);
      //console.log(currentUsersInRoom);
      socket.emit('serverData', currentUsersInRoom);
    });

    socket.on('logout', function (user) {
      delete currentUsersInRoom[user];
      socket.leave(room);
      socket.emit('serverData', currentUsersInRoom);
    })
  });
});

module.exports = app;
