var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');

// load the env vars
require('dotenv').config();

// create the Express app
var app = express();

// connect to the MongoDB with mongoose
require('./config/database');
//configure passport
require('./config/passport');

// require our routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
pp.use(session({
  secret: 'SEIRocks!',
  resave: false,
  saveUninitialized: true
}));
pp.use(passport.initialize());
app.use(passport.session());

//custom middleware that passes req.user to all templates
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
