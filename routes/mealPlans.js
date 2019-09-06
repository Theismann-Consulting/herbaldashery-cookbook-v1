const express = require('express');
const router = express.Router();
const mealPlansCtrl = require('../controllers/mealPlans');


router.get('/', isLoggedIn, mealPlansCtrl.index);
router.get('/new', isLoggedIn, mealPlansCtrl.new);
router.get('/:id', isLoggedIn, mealPlansCtrl.show);
router.get('/:id/edit', isLoggedIn, mealPlansCtrl.edit);
router.get('/:id/users', isLoggedIn, isAdmin, mealPlansCtrl.showUsers);
router.post('/', isLoggedIn, mealPlansCtrl.create);
router.post('/:id/recipes', isLoggedIn, mealPlansCtrl.addRecipe);
router.post('/:id/users', isLoggedIn, isAdmin, mealPlansCtrl.addUser);
router.put('/:id', isLoggedIn, mealPlansCtrl.update);
router.delete('/:id', isLoggedIn, mealPlansCtrl.delete);
router.delete('/:id/recipes/', isLoggedIn, mealPlansCtrl.removeRecipe);
router.delete('/:id/users', isLoggedIn, isAdmin, mealPlansCtrl.removeUser);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

function isAdmin(req, res, next) {
    if (req.user.role === 'Admin') return next();
    res.redirect('/recipes');
}

function isContributor(req, res, next) {
    if (req.user.role === 'Contributor' || req.user.role === 'Admin') return next();
    res.redirect('/recipes');
}
module.exports = router;