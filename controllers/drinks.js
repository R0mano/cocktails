const request = require('request');

const rootURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const filterOptions = {
  byDrinkName: 'search.php?s=',
  byIngredientName: 'filter.php?i=',
  // byFirstLetter: 'search.php?f=',
}

module.exports = {
  index,
  show,
};

function index(req, res) {
  // console.log(req.query, "This is req.query==========================================");
  // console.log(req.user, "this is req.user///////////////////////////////////////");

  const queryFilter = req.query.filter || filterOptions.byDrinkName;
  const userQuery = req.query.userQuery;
  let options= {
    url : `${rootURL}${queryFilter}${userQuery}`,
  };

  if (req.query.firstLetter) {
    // console.log('We are in FIRST LETTER');
    options.url = `${rootURL}search.php?f=${req.query.firstLetter}`
  }

  // console.log(options, 'this is OPTION');
  request(
    options, function(err, response, body) {
      // console.log(body, 'bodyyyyyyyyyyyyyyy');
      if (err) {console.log(err, 'err');} else {
        // console.log(response, 'responseeeeeeeeeeee');
        if(body) {
          response = JSON.parse(body);
        } else {
          response = {
            drinks: [],
          }
        }
      // console.log(response, 'this is the data retrieved from API');
      res.render("drinks/index", {
        title: "Cocktails",
        response,
        filterOptions,
      });
    }
    }
    );
}

function show(req, res) {
  // console.log(req.params);
    // console.log(req.query, "This is req.query==========================================");
    // console.log(req.user, "this is req.user///////////////////////////////////////");
    const userQuery = req.params.id;
    const options = {
      url : `${rootURL}lookup.php?i=${userQuery}`,
    }
  
    request(
      options, function(err, response, body) {
        if (err) {console.log(err);} else {
        const drink = JSON.parse(body).drinks[0];
        // console.log(drink, 'this is the data retrieved from API');
        res.render("drinks/show", {
          title: "Cocktails",
          drink,
        });
      }
      }
      );
  
  
}