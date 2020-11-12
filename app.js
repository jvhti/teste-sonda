var express = require('express');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const jsonErrorHandler = async (err, req, res) => {
  res.status(500).json({error: err.toString(), status: 500});
};

var app = express();

app.use(logger('dev'));
app.use(session({
  secret: 'VERY-SECRET'
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(jsonErrorHandler);

module.exports = app;
