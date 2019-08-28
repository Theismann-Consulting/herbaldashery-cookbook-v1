const Recipe = require('../models/recipe');

module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    delete: deleteRecipe,
    edit,
    update,
};

function index(req, res) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  Recipe.find(modelQuery)
  .exec(function(err, recipes) {
    if (err) return next(err);
  Recipe.find({}, function (err, recipes){
        res.render('recipes/index', {
          recipes,
        contributor: req.user,
        name: req.query.name,
      });
    });
  });
};

function show(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
          res.render('recipes/show', { 
          recipe,
          contributor: req.user,
         });
    });
};

function newRecipe(req, res) {
    res.render('recipes/new', {
        contributor: req.user,
      });
}

function create(req, res) {
    const recipe = new Recipe(req.body);
    recipe.contributor = req.user;
    recipe.save(function(err) {
      console.log(err);
        if (err) {return res.render('recipes/new', {
          contributor: req.user
        })};
        res.render('recipes/ingredients/new',{
        contributor: req.user,
        recipe,
        });
    });
};

function deleteRecipe(req, res, next) {
  console.log(req.params.id);
  Recipe.deleteOne({ _id: req.params.id}, function(err) {
    res.redirect('/recipes');
  });
};

function edit(req, res){
  Recipe.findById({ _id: req.params.id }, function(err, recipe){
    res.render('recipes/edit', {
      recipe,
      contributor: req.user,
    });
  });
};

function update(req, res) {
  Recipe.update({ _id: req.params.id }, req.body, function(err, recipe){
    res.render(`recipes/ingredients/new`,{
      contributor: req.user,
      recipe,
      });
  });
};