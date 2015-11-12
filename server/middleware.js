var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var userRouter = express.Router();
  var ballotRouter = express.Router();

  // app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));


  app.use('/api/users', userRouter); // use user router for all user request
  app.use('/api/ballots', ballotRouter);

  // // authentication middleware used to decode token and made available on the request
  // //app.use('/api/links', helpers.decode);
  // app.use('/api/links', linkRouter); // user link router for link request
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('./users/userRoutes.js')(userRouter);
  require('./ballots/ballotRoutes.js')(ballotRouter);
};
