require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

// Set mongoose strictQuery option
mongoose.set('strictQuery', false);

const app = express();
app.set('view engine', 'ejs');  // or 'pug', 'hbs', etc.

// 2. SET THE VIEWS FOLDER (optional but recommended)

connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Passport config
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  User.authenticate()
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Make user available in views
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/projects', require('./routes/projects'));
app.use(require('./routes/Task'));

app.get('/', (req, res) => {
  res.redirect('/projects');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
