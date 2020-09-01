const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    qty: {
      type: String,
    }
  }, {
    timestamps: true,
  }
);

const drinkSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      minlength: 3,
      required: true
    },
    ingredients: [ingredientSchema],
    image: String,
    glass: String,
    instructions: String,
    comments: [String],
    users: [Schema.Types.ObjectId],
}, {
  timestamps: true,
}
);

module.exports = mongoose.model('Drink', drinkSchema);