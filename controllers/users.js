const User = require("../models/user");

module.exports = {
  index,
};

function index(req, res, next) {
  console.log(req.query, 'This is req.query==========================================');
  console.log(req.user, 'this is req.user///////////////////////////////////////');
  // Make the query object to use with Student.find based on if
  // the user has submitted the search form or not
//   let modelQuery = req.query.name
//     ? { name: new RegExp(req.query.name, "i") }
//     : {};
//   // Default to sorting by name
//   let sortKey = req.query.sort || "name";
//   User.find(modelQuery)
//     .sort(sortKey)
//     .exec(function (err, users) {
//       if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      
      res.render("users/index", {
        title: "Cocktails",  
        // username: req.user.name,
        // name: req.query.name,
        // sortKey,
      });
    // });
}
