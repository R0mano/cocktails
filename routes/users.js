const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.js');


/* GET users listing. */
router.post('/users/drinks', isLoggedIn, usersCtrl.create);
router.get('/users/drinks', isLoggedIn, usersCtrl.index);
router.delete('/users/drinks', isLoggedIn, usersCtrl.deleteAll);
router.get('/users/drinks/new', isLoggedIn, usersCtrl.new);
router.post('/users/drinks/new', isLoggedIn, usersCtrl.createNewCocktail);
router.get('/users/drinks/:id', isLoggedIn, usersCtrl.show);
router.delete('/users/drinks/:id', isLoggedIn, usersCtrl.deleteOne);
router.get('/users/drinks/:id/edit', isLoggedIn, usersCtrl.edit);
router.put('/users/drinks/:id', isLoggedIn, usersCtrl.update);

// Protecting route!!
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
