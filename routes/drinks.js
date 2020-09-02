const router = require('express').Router();
// const router = express.Router();
const drinksCtrl = require('../controllers/drinks.js');


/* GET users listing. */
router.get('/drinks', drinksCtrl.index);
router.get('/drinks/firstletter', drinksCtrl.indexByLetter);
router.get('/drinks/:id', drinksCtrl.show);

// Protecting route!!
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;