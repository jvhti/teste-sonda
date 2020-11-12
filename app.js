var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const jsonErrorHandler = async (err, req, res) => {
  res.status(500).json({error: err.toString(), status: 500});
};

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(jsonErrorHandler);

module.exports = app;
