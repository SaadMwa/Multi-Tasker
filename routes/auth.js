const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Register page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email });
    await User.register(user, password);
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/auth/login');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/auth/register');
  }
});

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Login user
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/projects',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/auth/login');
  });
});

module.exports = router;
