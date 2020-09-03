const User = require("../models/user");
const Drink = require('../models/drink');

module.exports = {
  create,
  delete: deleteOne,
}

function create(req, res) {
  // console.log(req.params, 'this is req.params');
  // console.log(req.body, 'this is req.body');
  // console.log(req.user, 'this is req.user');
  Drink.findById(req.params.id, function(err, drink) {
    req.body.author = req.user._id;
    drink.comments.push(req.body);
    // console.log(drink);
    drink.save(function(err) {
      res.redirect(`/users/drinks/${drink._id}`);
    });
  });
}

function deleteOne(req, res) {
  Drink.findById(req.params.drink_id, function(err, drink) {
    if(err) {console.log(err);} else {
      drink.comments.id(req.params.comment_id).remove();
      // console.log(comment, 'this is the comment');
      drink.save(function(err) {
        res.redirect(`/users/drinks/${req.params.drink_id}`)
      });
    }
  });
}