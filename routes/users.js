const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.js');


/* GET users listing. */
router.get('/users', usersCtrl.index);

// Protecting route!!
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
