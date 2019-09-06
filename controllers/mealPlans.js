const Recipe = require('../models/recipe');
const User = require('../models/user');
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
    addUser,
    showUsers,
    removeUser,
};

function index(req, res) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  MealPlan.find(modelQuery)
  .exec(function(err, mealPlans) {
    if (err) return next(err);
      MealPlan.find({}, function (err, mealPlans){
        Recipe.find({ mealPlans: mealPlans._id}, function(err,recipes){
          res.render('mealplans/index', {
            recipes,
            mealPlans,
          contributor: req.user,
          name: req.query.name,
        });
      });
    });
  });
};

function show(req, res) {
    MealPlan.findById(req.params.id, function(err, mealPlan) {
      Recipe.find({ mealPlan: mealPlan._id }, function(err, recipes){
        User.find({mealPlansAssigned: mealPlan._id}, function(err, users){
          res.render('mealplans/show', { 
          recipes,
          contributor: req.user,
          mealPlan,
          users,
         });
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
      User.updateMany({mealPlansAssigned: mealPlan}, {$pull: {mealPlansAssigned: mealPlan._id}}, function(err){
        User.updateMany({mealPlansOwned: mealPlan}, {$pull: {mealPlansOwned: mealPlan._id}}, function(err){
          res.redirect('/mealplans');
        });
      });
    });
  });
};

function showUsers(req, res) {
  User.findById(req.user, function(err, user){
    MealPlan.findById(req.params.id, function(err, mealPlan){
      User.find({}, function(err, allUsers){
        User.find({ mealPlansAssigned: mealPlan._id }, function(err, users){
          Recipe.find({}, function(err, allRecipes){
            Recipe.find({ mealPlan: mealPlan._id }, function(err, recipes){
              res.render('mealplans/addUser',{
                contributor: req.user,
                mealPlan,
                users,
                allUsers,
                recipes,
                allRecipes,
              });
            });
          });
        });
      });
    });
  });
};

function addUser(req, res) {
  User.findById(req.body.user, function(err, user){
    MealPlan.findById(req.params.id, function(err, mealPlan){
      user.mealPlansAssigned.push(mealPlan);
      user.save(function(err){
        mealPlan.assignedUsers.push(user);
        mealPlan.save(function(err, m){
          res.redirect(`/mealplans/${mealPlan._id}/users`);
        })
      });
    });
  });
};

function removeUser(req, res, next) {
  MealPlan.findByIdAndUpdate(req.params.id, {$pull: {assignedUsers: req.body.userId}}, {new: true}, function(err, mealPlan) {
    User.findByIdAndUpdate(req.body.userId, {$pull: { mealPlansAssigned: mealPlan._id} }, {new: true}, function(err, user){
      res.redirect(`/mealplans/${mealPlan._id}/users`);
    });
  });
};