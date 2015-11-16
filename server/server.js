var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

require('./config/middleware.js')(app, express);

var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(port);

var storage = {};

io.on('connection', function (socket) {
  socket.on('userData', function (data) {
    storage[data.id] = data;
    socket.emit('serverData', storage);
  });
  socket.on('logout', function (data) {
    delete storage[data];
  });
});

module.exports = app;
