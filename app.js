const dotenv = require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./models/user');
const debug = require('debug')('surf-shop:app');
const methodOverride = require('method-override');

// Require routes
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const reviewsRouter = require('./routes/reviews');

// MongoDB connection
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{debug("Database connected.")})

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Morgan logs server requests:
  // 'dev': output colored by response status for development use
    // green for success codes
    // red for server error codes
    // yellow for client error codes
    // cyan for redirection codes
    // uncolored for information codes
app.use(logger('dev'));

// use body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use cookie-parser
app.use(cookieParser());

// use public library
app.use(express.static(path.join(__dirname, 'public')));

// use method-override
app.use(methodOverride('_method'));

// configure Passport and Sessions
// !!! session has to be configured before passport
app.use(session({
  secret: process.env.APP_SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
// configure Passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Mount routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);

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
