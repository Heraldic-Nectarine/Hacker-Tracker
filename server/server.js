var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 8000;

require('./config/middleware.js')(app, express);

server.listen(port);

io.on('connection', function (socket) {

  socket.on('test', function (data) {
    console.log(data);
  });
});

module.exports = app;
