const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/drinks');
});

// User wants to log in
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

//Google OAuth callbak route
router.get('/oauth2callback', passport.authenticate('google', {
    successRedirect: '/drinks',
    failureRedirect: '/drinks',
  }
));

//Logging out
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/drinks');
});

module.exports = router;

module.exports = router;
