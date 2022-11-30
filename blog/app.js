var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')


var logger = require('morgan');
// 前台路由文件/
var indexRouter = require('./routes/index');
// 后台路由文件/
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: true,  // 新增
  saveUninitialized: true,  // 新增
  // secret 加密用的密钥
  secret: 'suiji',
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}))

// 多页面共存/
app.use(function (req, res, next) {
  // res.locals 本地存储信息的对象
  // 设置默认信息 
  res.locals.user = '';
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'up')));

// 前台/
app.use('/', indexRouter);
// 后台/
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
