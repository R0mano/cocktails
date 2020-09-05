const request = require('request');
const Drink = require('../models/drink');

const rootURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const filterOptions = {
  byDrinkName: 'search.php?s=',
  byIngredientName: 'filter.php?i=',
}

module.exports = {
  index,
  show,
};

function index(req, res) {
  const queryFilter = req.query.filter || filterOptions.byDrinkName;
  let userQuery = req.query.userQuery;
  let options= {
    url : `${rootURL}${queryFilter}${userQuery}`,
  };

  let cocktailsDBQuery;
  if (req.query.firstLetter) {
    userQuery = req.query.firstLetter;
    options.url = `${rootURL}search.php?f=${userQuery}`
    cocktailsDBQuery = {name: new RegExp("^" + req.query.firstLetter + ".*$", "i")}
  } else if (queryFilter === 'search.php?s=' && userQuery) {
    cocktailsDBQuery = (userQuery) ? {name: new RegExp(userQuery, "i")} : '';
  } else if (queryFilter === 'filter.php?i=') {
    cocktailsDBQuery = {"drink.ingredients": new RegExp(userQuery, "i")}
  }

  Drink.find(cocktailsDBQuery, function(err, cocktailsDBResponse) {
    if (err){console.log(err);}else{
      if (!userQuery) {cocktailsDBResponse = [];}
      console.log(cocktailsDBResponse, 'cocktailsDBResponse');

      request(
        options, function(err, response, body) {
          if (err) {console.log(err, 'err');} else {
            if(body) {
              response = JSON.parse(body);
              if (!response.drinks) {response.drinks = []}              
              cocktailsDBResponse.forEach((drink) => {
                if (drink.custom === 'custom') {
                response.drinks.push(drink)
                }
              });
            } else {
              response = {
                drinks: cocktailsDBResponse,
              }
              cocktailsDBResponse.forEach((drink) => {
                response.drinks.push(drink)
              });
            }
            res.render("drinks/index", {
            title: "Cocktails",
            response,
            filterOptions,
            userQuery,
          });
        }
        });
    }
  })
}

function show(req, res) {
    const userQuery = req.params.id;
    const options = {
      url : `${rootURL}lookup.php?i=${userQuery}`,
    }
    if (userQuery.length > 7) {
      Drink.findById(req.params.id, function(err, drink) {
        if(err){
          console.log(err);
        } else {
          res.render("drinks/show", {
            title: "Cocktails",
            drink,
          });
        }
      });
    } else {
      request(
        options, function(err, drink, body) {
          if (err) {console.log(err);} else {
          drink = JSON.parse(body).drinks[0];
          res.render("drinks/show", {
            title: "Cocktails",
            drink,
          });
        }
        }
        );
    }
}