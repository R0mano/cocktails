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

const commentSchema = Schema (
  {
    content: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 300,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
    
  }, {
    timestamps: true,
  }
)

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
    comments: [commentSchema],
    users: [Schema.Types.ObjectId],
    custom: {
      type: String,
      enum: ['custom', 'reg'],
      default: 'reg',
    }
}, {
  timestamps: true,
}
);

module.exports = mongoose.model('Drink', drinkSchema);