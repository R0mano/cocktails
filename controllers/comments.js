const User = require("../models/user");
const Drink = require('../models/drink');

module.exports = {
  create,
}

function create (req, res) {
  // console.log(req.params, 'this is req.params');
  // console.log(req.body, 'this is req.body');
  // console.log(req.user, 'this is req.user');
  Drink.findById(req.params.id, function(err, drink) {
    req.body.author = req.user._id;
    drink.comments.push(req.body);
    // console.log(drink);
    drink.save(function(err) {
      res.redirect(`/users/drinks/${drink._id}`);
    })
  })

}