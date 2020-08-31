const request = require('request');
const User = require("../models/user");
const Drink = require('../models/drink');

const rootURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

module.exports = {
  index,
  create,
  show,
  delete: deleteAll,
};

function index(req, res, next) {
  console.log(req.query, "This is req.query==========================================");
  console.log(req.user, "this is req.user///////////////////////////////////////");
  
  const queryFilter = req.query.filter;
  const userQuery = req.query.userQuery;
  const options = {
    url : `${rootURL}search.php?s=${userQuery}`,
  }

  const filters = {
    filterByDrink: 'search.php?s=',
    filterByIngredient: 'filter.php?i=',
  }

  request(
    options, function(err, response, body) {
      if (err) {console.log(err);} else {
      response = JSON.parse(body);
      console.log(response, 'this is the data retrieved from API');
      res.render("users/index", {
        title: "Cocktails",
        response,
      });
    }
    }
    );
}

function create(req, res) {
  // console.log(req.body.drink, 'This is the newFavDrink BEFORE JSON.parse()');
  const newFavDrink = JSON.parse(req.body.drink);
  // console.log(newFavDrink, 'This is the newFavDrink AFTER JSON.parse()');
  // User.findById(req.user._id, function(user) {
    const regExIngredient = new RegExp("strIngredient");
    // const regExMesure = new RegExp("strMeasure");

    let drink = new Drink();
    console.log(drink, "new Drink()");
    drink.name = newFavDrink.strDrink;
    drink.image = newFavDrink.strDrinkThumb;
    drink.instructions = newFavDrink.strInstructions;
    if (!drink.users.includes(req.user._id)) {
    drink.users.push(req.user._id);
    }
    for (let key in newFavDrink) {
      if (regExIngredient.test(key) && newFavDrink[key] ) {
        drink.ingredients.push({name: newFavDrink[key]});
        // console.log( newFavDrink[key], 'ingredient names to be added to the newly created drink');
        // console.log(key,'key');
        // console.log(regExIngredient.test(key),'regExIngredient.test(key)');
      } 
    }
    drink.ingredients.forEach((ingredient, i) => {
      ingredient.qty = newFavDrink['strMeasure' + (i + 1).toString()]
    })
    console.log(drink, 'drink AFTER populating');
    drink.save(function(err) {
      if (err) {console.log(err)}
      res.redirect('/users/drinks');
    })
    // console.log(drink, 'This is the newly created drink in the user Favorites');
  // })
}

function show(req,res) {
  console.log(req.user._id);
  Drink.find({users: {$in: [req.user._id]}}, function(err, drinks) {
    console.log(drinks);
    res.render('users/show', {
      title: 'My Cocktail',
      drinks,
    })
  })
}

function deleteAll (req, res) {
  Drink.deleteMany({}, function(err) {
    res.redirect('/users/drinks');
  });
  
  
}
