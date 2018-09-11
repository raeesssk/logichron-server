var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var roles = require("user-groups-roles");
// var nodemailer = require('nodemailer');

var oauth = require('./oauth');
var login = require('./routes/login');
var expense = require('./routes/expense');

var routes = require('./routes/index');
var airline = require('./routes/airline');
var visa = require('./routes/visa');
var hotel = require('./routes/hotel');
var dashboard = require('./routes/dashboard');
var user = require('./routes/user');
var sms = require('./routes/sms');
var emailsent = require('./routes/emailsent');
var backup = require('./routes/backup');
var employee = require('./routes/employee');
var userm = require('./routes/userm');
var role = require('./routes/role');
var contact = require('./routes/contact');
var permission = require('./routes/permission');
var question = require('./routes/question');
var campaign= require('./routes/campaign');
var telecaller= require('./routes/telecaller');
var assign = require('./routes/assign');

var pmx = require('pmx').init({
  http          : true, // HTTP routes logging (default: true)
  ignore_routes : [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
  errors        : true, // Exceptions loggin (default: true)
  custom_probes : true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
  network       : true, // Network monitoring at the application level
  ports         : true  // Shows which ports your app is listening on (default: false)
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// OAuth2 Server
app.oauth = oauth;
app.all('/oauth/token', app.oauth.grant());
app.use(app.oauth.errorHandler());

// Define Routes Here
app.use('/login', login);
app.use('/expense', expense);
app.use('/airline', airline);
app.use('/visa', visa);
app.use('/hotel', hotel);
app.use('/dashboard', dashboard);
app.use('/sms', sms);
app.use('/emailsent', emailsent);
app.use('/backup', backup);
app.use('/user', user);
app.use('/employee', employee);
app.use('/userm', userm);
app.use('/role', role);
app.use('/contact', contact);
app.use('/permission', permission);
app.use('/question', question);
app.use('/campaign', campaign);
app.use('/telecaller',telecaller);
app.use('/assign',assign);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
