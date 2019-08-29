const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');

module.exports = {
    create,
    delete: deleteIngredient,
    update,
    clean,
};


function create(req, res) {
    const ingredient = new Ingredient(req.body);
    ingredient.contributor = req.user;
    ingredient.save(function(err, i) {
      if (err) {return res.render('recipes/ingredients/index', {
        contributor: req.user
      })};
      Recipe.findById(ingredient.recipe, function(err, recipe){
        recipe.ingredients.push(i);
        recipe.save(function(err, r){
          Ingredient.find({ recipe: r._id }, function(err, ingredients){
            res.render('recipes/ingredients/index',{
              contributor: req.user,
              recipe,
              ingredients,
            });
          });
        });
      });
    });
};

function deleteIngredient(req, res, next) {
  Ingredient.findByIdAndDelete(req.params.id, function(err, i) {
    Recipe.updateMany({ingredients: i}, {$pull: {ingredients: i._id}}, function(err){
      Recipe.findById(i.recipe, function(err, recipe){
        Ingredient.find({ recipe: recipe._id }, function(err, ingredients){
          res.render('recipes/ingredients/index', {
            contributor: req.user,
            recipe,
            ingredients,
          });
        });
      });
    });
  });
};

function clean(req, res, next){
  Ingredient.deleteMany({recipe: {$size: 0}}, function (err, i) {
    res.redirect('/recipes');
  });
}

function update(req, res) {
  Ingredient.update({ _id: req.params.id }, req.body, function(err){
    res.redirect(`/ingredients/${req.params.id}`);
  });
};