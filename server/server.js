var express = require('express');
var mongoose = require('mongoose');

var app = express();

var port = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost/voter');

require('./middleware.js')(app, express);

app.listen(port);

module.exports = app;