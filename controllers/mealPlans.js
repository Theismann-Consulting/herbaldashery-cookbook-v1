const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const MealPlan = require('../models/mealPlan');

module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    delete: deleteMealPlan,
    edit,
    update,
    addRecipe,
    removeRecipe,
};

function index(req, res) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  MealPlan.find(modelQuery)
  .exec(function(err, mealPlans) {
    if (err) return next(err);
      MealPlan.find({}, function (err, mealPlans){
        res.render('mealplans/index', {
          mealPlans,
        contributor: req.user,
        name: req.query.name,
      });
    });
  });
};

function show(req, res) {
    MealPlan.findById(req.params.id, function(err, mealPlan) {
      Recipe.find({ mealPlan: mealPlan._id }, function(err, recipes){
          res.render('mealplans/show', { 
          recipes,
          contributor: req.user,
          mealPlan,
         });
      });
    });
};

function newRecipe(req, res) {
    res.render('mealplans/new', {
        contributor: req.user,
      });
}

function create(req, res) {
    const mealPlan = new MealPlan(req.body);
    mealPlan.owner = req.user;
    mealPlan.save(function(err, mealPlan) {
        if (err) {return res.render('mealplans/new', {
          contributor: req.user
        })};
        Recipe.find({}, function(err, allRecipes){
          Recipe.find({ mealPlan: mealPlan._id }, function(err, recipes){
            res.render('mealplans/addRecipe',{
            contributor: req.user,
            mealPlan,
            recipes,
            allRecipes,
            });
          });
        });
    });
};

function removeRecipe(req, res, next) {

  MealPlan.findByIdAndUpdate(req.params.id, {$pull: {recipes: req.body.recipeId}}, {new: true}, function(err, mealPlan) {
    Recipe.findByIdAndUpdate(req.body.recipeId, {$pull: { mealPlan: mealPlan._id} }, {new: true}, function(err, recipe){
      Recipe.find({}, function(err, allRecipes){
        Recipe.find({ mealPlan: mealPlan._id }, function(err, recipes){
          res.render('mealplans/addRecipe',{
          contributor: req.user,
          mealPlan,
          recipes,
          allRecipes,
          });
        });
      });     
    });
  });
};

function edit(req, res){
  MealPlan.findById({ _id: req.params.id }, function(err, mealPlan){
    res.render('mealplans/edit', {
      mealPlan,
      contributor: req.user,
    });
  });
};

function update(req, res) {
  MealPlan.findByIdAndUpdate({ _id: req.params.id }, req.body, {new: true}, function(err, mealPlan){
    Recipe.find({}, function(err, allRecipes){
      Recipe.find({ mealPlan: mealPlan._id }, function(err, recipes){
        res.render('mealplans/edit',{
        contributor: req.user,
        mealPlan,
        recipes,
        allRecipes,
        });
      });
    });     
  });
};

function addRecipe(req, res) {
  Recipe.findById(req.body.recipe, function(err, recipe){
    MealPlan.findById(req.params.id, function(err, mealPlan){
      recipe.mealPlan.push(mealPlan);
      recipe.save(function(err){
        mealPlan.recipes.push(recipe);
        mealPlan.save(function(err, m){
          Recipe.find({}, function(err, allRecipes){
            Recipe.find({ mealPlan: mealPlan._id }, function(err, recipes){
              res.render('mealplans/addRecipe',{
                contributor: req.user,
                mealPlan,
                recipes,
                allRecipes,
              });
            });
          });
        })
      });
    });
  });
};

function deleteMealPlan(req, res, next) {
  MealPlan.findByIdAndDelete(req.params.id, function(err, mealPlan) {
    Recipe.updateMany({mealPlan: mealPlan}, {$pull: {mealPlan: mealPlan._id}}, function(err){
      res.redirect('/mealplans');
    });
  });
};