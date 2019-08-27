const Ingredient = require('../models/ingredient');

module.exports = {
    create,
    delete: deleteIngredient,
    edit,
    update,
};


function create(req, res) {
  Ingredient.findById(req.params.id, function(err, ingredient) {
    ingredient.ingredients.push(req.body);
    flight.save(function(err) {
        res.redirect(`/recipes/${recipe._id}`);
    });
});
    const ingredient = new Ingredient(req.body);
    ingredient.contributor = req.user;
    ingredient.save(function(err) {
      console.log(err);
        if (err) {return res.render('recipes/ingredients/new', {
          contributor: req.user
        })};
        res.render('recipes/ingredients/new',{
        contributor: req.user,
        ingredient,
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