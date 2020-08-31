const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.js');


/* GET users listing. */
router.get('/users', usersCtrl.index);
router.post('/users/drinks', isLoggedIn, usersCtrl.create);
router.get('/users/drinks', isLoggedIn, usersCtrl.show);
router.delete('/users/drinks', isLoggedIn, usersCtrl.delete);

// Protecting route!!
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
