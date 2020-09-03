const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments.js');

// router.post('/users/drinks/:id/comments', isLoggedIn, commentsCtrl.create);
router.post('/users/drinks/:id/comments', isLoggedIn, commentsCtrl.create);
router.delete('/users/drinks/:drink_id/comments/:comment_id', isLoggedIn, commentsCtrl.delete);



// Protecting route!!
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;