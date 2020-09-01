const request = require('request');
const User = require("../models/user");
const Drink = require('../models/drink');

const rootURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

module.exports = {
  index,
  create,
  deleteAll,
  show,
  deleteOne,
  edit,
  update,
};

function index(req,res) {
  // console.log(req.user._id);
  Drink.find({users: {$in: [req.user._id]}}, function(err, drinks) {
    // console.log(drinks);
    res.render('users/index', {
      title: 'My Cocktail',
      drinks,     
    });
  });
}

function create(req, res) {
  // console.log(req.body.drink, 'This is the newFavDrink BEFORE JSON.parse()');
  const newFavDrink = JSON.parse(req.body.drink);
  // console.log(newFavDrink, 'This is the newFavDrink AFTER JSON.parse()');
    const regExIngredient = new RegExp("strIngredient");
  Drink.findOne({name: newFavDrink.strDrink}, function(err, drink) {
    // console.log(drink, 'drinkkkkkkkkkkkkkkkk');
    if (drink && !drink.users.includes(req.user._id)) {
      drink.users.push(req.user._id);
    } else {
      drink = new Drink();
      // console.log(drink, "new Drink()");
      drink.name = newFavDrink.strDrink;
      drink.image = newFavDrink.strDrinkThumb;
      drink.glass = newFavDrink.strGlass;
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
      });
      // console.log(drink, 'drink AFTER populating');
    }
    drink.save(function(err) {
      if (err) {console.log(err)}
      res.redirect('/users/drinks');
    });
    // console.log(drink, 'This is the newly created drink in the user Favorites');
  // })
  });
    
}

function show(req, res) {
  Drink.findById(req.params.id, function(err, drink) {
    if (err) {console.log(err);} else {
      res.render('users/show', {
        title: 'Drink details',
        drink,
      })
    }
  });
}

function edit(req, res) {
  Drink.findById(req.params.id, function(err, drink) {
    if(err) {console.log(err);} else {
      res.render('users/edit', {
        title: 'Edit a cocktail',
        drink,
      });
    }   
  });
}

function update(req, res) {
  console.log(req.body, 'This is req.body');
  const updatedDrink = req.body;
  Drink.findById(req.params.id, function(err, drink) {
    if (err){console.log(err);}else{
    drink.name = updatedDrink.drinkName;
    drink.ingredients = [];

    // Replace findByIdAndUpdate by findById to be able to displey the console.log()
    console.log(drink.ingredients, 'drink.ingredients EMPTY');

    for (let i = 0; i < updatedDrink.ingredientName.length; i++) {
      let newIngredient = {
        name: updatedDrink.ingredientName[i],
        qty: (updatedDrink.qty[i]) ? updatedDrink.qty[i] : '',
      }
      if (newIngredient.name) {
      drink.ingredients.push(newIngredient);
      }
    }
    console.log(drink.ingredients, 'drink.ingredients POPULATED');
    drink.glass = updatedDrink.glass;
    drink.image = updatedDrink.image;
    drink.instructions = updatedDrink.instructions;
    // console.log(drink.ingredient, 'drink.ingredients AFTER');

    console.log(drink, 'This is the finished and updated drink');
    drink.save(function(err) {
      res.redirect(`/users/drinks/${drink._id}`);
    });
    

  }
  });
}

function deleteOne(req, res) {
  Drink.findByIdAndDelete(req.params.id, function(err) {
    res.redirect('/users/drinks');
  });
}

function deleteAll (req, res) {
  Drink.deleteMany({}, function(err) {
    res.redirect('/users/drinks');
  });
  
  
}
