const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
  name: String,
  amount: String,
},{
  timestamps: true,
});

module.exports - mongoose.model('Ingredient', ingredientsSchema);