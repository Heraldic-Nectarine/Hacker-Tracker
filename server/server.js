var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 8000;

require('./config/middleware.js')(app, express);

server.listen(port);

var storage = {};

io.on('connection', function (socket) {
  socket.on('userData', function (data) {
    storage[data.id] = data;
    socket.emit('serverData', storage);
  });
});

module.exports = app;
