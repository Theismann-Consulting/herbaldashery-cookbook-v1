const Recipe = require('../models/recipe');

module.exports = {
    index,
    show,
    new: newRecipe,
    create
};

function index(req, res) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  Recipe.find(modelQuery)
  .exec(function(err, recipes) {
    if (err) return next(err);
  Recipe.find({}, function (err, recipes){
        res.render('recipes/index', {
          recipes,
        user: req.user,
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
    res.render('recipes/new');
}

function create(req, res) {
    const recipe = new Recipe(req.body);
    recipe.save(function(err) {
        if (err) return res.render('recipes/new');
        console.log(recipe);
        res.redirect('/recipes');
    });
}