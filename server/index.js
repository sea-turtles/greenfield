'use strict';

// debug ====================================================================
var debug = require('debug');
debug.enable('server:*');
var log = debug('server:log');
var info = debug('server:info');
var error = debug('server:error');

// set up ===================================================================
const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const passport = require('passport');
const flash = require('flash');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const db = require('./config/db.js');
const password = require('./config/secret.js');
const Promise = require('bluebird');
const LocalStrategy = require('passport-local').Strategy;
const port = process.env.PORT || 8000;

const app = express();

// configuration ============================================================

// db controllers
const User = require('../database/controllers/user.js');
const Record = require('../database/controllers/record.js');

// connect to mongoDB database
mongoose.connect(db.url);

// parse data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// session management
app.use(expressSession({
  secret: password.phrase,
  resave: true,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 30 * 24 * 60 * 60
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  },
  function(err) {
    if (err) { return error('Failed Mongod Connection for Sessions', err); }
    return log('Connected mongostore for storing session data.');
  })
}));
app.use(passport.initialize());
app.use(passport.session());

// flash notifications
app.use(flash());

// routes =========================================================================
app.use(express.static(__dirname + '/../public'));

require('./routes/auth.js')(app);
require('./routes/kurento.js')(app);

// handle every other route with index.html
app.get('*', (req, res, next) =>
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
);

// listen (start app with node / nodemon index.js) ================================
app.listen(port, err => {
  if (err) {
    error('Error while trying to start the server (port already in use maybe?)');
    return err;
  }
  info(`server listening on port ${port}`);
});

module.exports = app;
