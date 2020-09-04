const request = require('request');

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
  const userQuery = req.query.userQuery;
  let options= {
    url : `${rootURL}${queryFilter}${userQuery}`,
  };

  if (req.query.firstLetter) {
    options.url = `${rootURL}search.php?f=${req.query.firstLetter}`
  }

  request(
    options, function(err, response, body) {
      if (err) {console.log(err, 'err');} else {
        if(body) {
          response = JSON.parse(body);
        } else {
          response = {
            drinks: [],
          }
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

function show(req, res) {
    const userQuery = req.params.id;
    const options = {
      url : `${rootURL}lookup.php?i=${userQuery}`,
    }
  
    request(
      options, function(err, response, body) {
        if (err) {console.log(err);} else {
        const drink = JSON.parse(body).drinks[0];
        res.render("drinks/show", {
          title: "Cocktails",
          drink,
        });
      }
      }
      );
}