'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var http = require('http');
var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// handlebar
var exphbs  = require('express-handlebars');
var hbs = exphbs.create ( { 
	defaultLayout: path.join(__dirname, '/views/layouts/main')
});

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine );
app.set('view engine', 'handlebars');

// routers
var index = require('./routes/index');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var msg = `CODE 404: ${req.path} does not exist!`;
	var err = new Error( msg );
  	err.status = 404;
  	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// only leak msg in development
	let msg = app.get('env') === 'development' ? err.message : '';

	// render the error page
	return res.status( err.status || 500 ).send(msg);
});

module.exports = app;


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
