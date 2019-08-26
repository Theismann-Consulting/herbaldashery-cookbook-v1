const Recipe = require('../models/recipe');

module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    delete: deleteRecipe,
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
         res.render('recipe/show', { receipe });
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
    recipe.category = {
      default: Unassigned,
    }
    recipe.save(function(err) {
        if (err) return res.render('recipes/new');
        console.log(recipe);
        res.redirect('/recipes');
    });
}

function deleteRecipe(req, res, next) {
  console.log(req.params.id);
  Recipe.deleteOne({ _id: req.params.id}, function(err) {
    res.redirect('/recipes');
  });
};