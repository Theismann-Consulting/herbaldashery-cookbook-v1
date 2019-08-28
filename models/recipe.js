const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    category: String,
    prepTime: String,
    cookTime: String,
    instructions: String,
    instructionsHtml: String,
    instructionsString: String,
    ingredients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
    }],
    contributor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: [{
      type: String,
      default: 'Unassigned',
    }],
    description: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Recipe', recipeSchema);