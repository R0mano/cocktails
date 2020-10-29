
const Drink = require('../models/drink');

module.exports = {
  index,
  create,
  deleteAll,
  show,
  deleteOne,
  edit,
  update,
  new: newCocktail,
  createNewCocktail,
};

function index(req,res) {
  Drink.find({users: {$in: [req.user._id]}}, function(err, drinks) {
    res.render('users/index', {
      title: 'My Cocktail',
      drinks,
    });
  });
}

function create(req, res) {
  const newFavDrink = JSON.parse(req.body.drink);
  console.log(JSON.parse(req.body.drink), ' <- This is req.body');
  const regExIngredient = new RegExp("strIngredient");

  Drink.findOne({name: newFavDrink.strDrink ? newFavDrink.strDrink : newFavDrink.name}, function(err, drink) {
    if (drink && !drink.users.includes(req.user._id)) {
      drink.users.push(req.user._id);
    } else {
      drink = new Drink();
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
        } 
      }
      drink.ingredients.forEach((ingredient, i) => {
        ingredient.qty = newFavDrink['strMeasure' + (i + 1).toString()]
      });
    }
    drink.save(function(err) {
      if (err) {console.log(err)}
      res.redirect('/users/drinks');
    });
  });
}

function newCocktail(req, res) {
  res.render('users/new', {
    title: "Create a New Drink",
    message: "",
  });
}

function createNewCocktail(req, res) {
  const newFavDrink = req.body;
  Drink.find({$and:[{name:{$regex: newFavDrink.drinkName, $options: 'i'}},{users: req.user._id}]}, function(err, drink) {
    if(err) {console.log(err);} else if (drink.length) {
      res.render('users/new', {title: "Create a New Drink", message: "Oops! It looks like there's already a cocktail with this name in your favorites. Please give your cocktail a different name."});
    } else {
      newDrink = new Drink();
      newDrink.name = newFavDrink.drinkName;
      newDrink.custom = 'custom';

      if (newFavDrink.image) {
        newDrink.image = newFavDrink.image;
      }

      newDrink.glass = newFavDrink.glass;
      newDrink.instructions = newFavDrink.instructions;
      newDrink.users.push(req.user._id);
      
      for (let i = 0; i < newFavDrink.ingredientName.length; i++) {
        if(newFavDrink.ingredientName[i]) {
        newDrink.ingredients.push( {
          name: newFavDrink.ingredientName[i],
          qty: (newFavDrink.qty[i]) ? newFavDrink.qty[i] : '',
        });
      }
      }
    
      newDrink.save(function(err) {
        if (err) {console.log(err)}
        res.redirect('/users/drinks');
      });    
    }
  });
}

function show(req, res) {
  console.log(req.user, 'this is req.user');
  Drink.findById(req.params.id).populate({path: 'comments', populate: {path: 'author', model: 'User'}}).exec(function(err, drink) {
      if (err) {console.log(err);} else {
        res.render('users/show', {
          title: 'Drink details',
          drink,
        });
      }
    });
}

function edit(req, res) {
  Drink.findById(req.params.id, function(err, drink) {
    if(err) {console.log(err);} else {
      res.render('users/edit', {
        title: 'Edit a cocktail',
        drink,
        message: "",
      });
    }   
  });
}

function update(req, res) {
  const oldDrinkId = req.params.id;
  const updatedDrink = req.body;
  Drink.find({$and:[{name:{$regex: updatedDrink.drinkName, $options: 'i'}},{users: req.user._id}]}, function(err, drink) {
    if (err) {console.log(err);} else if (drink.length) {
      Drink.findById(oldDrinkId, function(err, oldDrink) {
        res.render('users/edit', {title: 'Edit a cocktail', drink: oldDrink, message: "Oops! It looks like there's already a cocktail with this name in your favorites. Please give your cocktail a different name."});
      });
    } else {
  let newDrink = new Drink();

    newDrink.name = updatedDrink.drinkName;

    for (let i = 0; i < updatedDrink.ingredientName.length; i++) {
      if (updatedDrink.ingredientName[i]) {
      newDrink.ingredients.push( {
        name: updatedDrink.ingredientName[i],
        qty: (updatedDrink.qty[i]) ? updatedDrink.qty[i] : '',
      });
    }
    }

    newDrink.glass = updatedDrink.glass;
    newDrink.image = updatedDrink.image;
    newDrink.instructions = updatedDrink.instructions;
    newDrink.users.push(req.user._id);
    newDrink.custom = 'custom';
  
    newDrink.save(function(err) {
      res.redirect('/users/drinks');
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
