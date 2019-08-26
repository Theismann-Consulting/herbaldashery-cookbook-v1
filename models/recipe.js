const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
  name: String,
  amount: String,
},{
  timestamps: true,
});

const recipeSchema = new mongoose.Schema({
    name: String,
    category: String,
    prepTime: String,
    cookTime: String,
    instructions: String,
    ingredients: [ingredientsSchema],
    contributor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Recipe', recipeSchema);