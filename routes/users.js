var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');


/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

// Protecting route!!
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
