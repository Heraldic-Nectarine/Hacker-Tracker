var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('./logger.js');

module.exports = function (app, express) {
	app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.use(cookieParser());
  // parse application/x-www-form-urlencoded and application/json
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(logger);

};
