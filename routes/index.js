var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cocktails' });
});

// User wants to log in
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

//Google OAuth callbak route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/users',
    failureRedirect: '/users',
  }

));

//Logging out
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/users');
});

module.exports = router;

module.exports = router;
