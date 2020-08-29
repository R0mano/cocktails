const request = require('request');
const User = require("../models/user");

const rootURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

module.exports = {
  index,
};

function index(req, res, next) {
  console.log(req.query, "This is req.query==========================================");
  console.log(req.user, "this is req.user///////////////////////////////////////");
  
  const userQuery = req.query.userQuery;
  const options = {
    url : `${rootURL}search.php?s=${userQuery}`,
  }

  request(
    options, function(err, response, body) {
      if (err) {console.log(err);} else {
      const results = JSON.parse(body);
      console.log(results, 'this is the data retrieved from API');
      res.render("users/index", {
        title: "Cocktails",
        results,
      });
    }
    }
    );
}
