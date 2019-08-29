const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');

module.exports = {
    create,
    delete: deleteIngredient,
    edit,
    update,
    clean,
};


function create(req, res) {
  console.log(req.body);
    const ingredient = new Ingredient(req.body);
    ingredient.contributor = req.user;
    console.log(ingredient);
    ingredient.save(function(err, i) {
      console.log(i);
      if (err) {return res.render('recipes/ingredients/index', {
        contributor: req.user
      })};
      Recipe.findById(ingredient.recipe, function(err, recipe){
        recipe.ingredients.push(i);
        recipe.save(function(err, r){
          console.log(r);
          Ingredient.find({ recipe: r._id }, function(err, ingredients){
            console.log(ingredients);
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
  Ingredient.deleteMany({recipes: ''}, function (err) {
    res.redirect('/recipes');
  });
}

function edit(req, res){
  Ingredient.findById({ _id: req.params.id }, function(err, ingredient){
    res.render('ingredients/edit', {
      ingredient,
      contributor: req.user,
    });
  });
};

function update(req, res) {
  Ingredient.update({ _id: req.params.id }, req.body, function(err){
    res.redirect(`/ingredients/${req.params.id}`);
  });
};