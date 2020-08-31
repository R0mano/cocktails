const request = require('request');

const rootURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

module.exports = {
  show,
};

function show(req, res) {
  console.log(req.params);
  
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
        console.log(drink, 'this is the data retrieved from API');
        res.render("drinks/show", {
          title: "Cocktails",
          drink,
        });
      }
      }
      );
  
  
}