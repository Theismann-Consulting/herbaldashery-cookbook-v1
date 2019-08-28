const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');

module.exports = {
    create,
    delete: deleteIngredient,
    edit,
    update,
};


function create(req, res) {
  console.log(req.body);
    const ingredient = new Ingredient(req.body);
    ingredient.contributor = req.user;
    console.log(ingredient);
    ingredient.save(function(err, i) {
      console.log(i);
        if (err) {return res.render('recipes/ingredients/new', {
          contributor: req.user
        })};
        Recipe.findById(ingredient.recipe, function(err, recipe){
          recipe.ingredients.push(i);
          recipe.save(function(err){
            console.log(recipe);
            res.render('recipes/ingredients/new',{
              contributor: req.user,
              recipe,
              });
          });
        });
    });
};

function deleteIngredient(req, res, next) {
  console.log(req.params.id);
  Ingredient.deleteOne({ _id: req.params.id}, function(err) {
    res.redirect('/ingredients');
  });
};

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