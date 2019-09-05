const express = require('express');
const router = express.Router();
const mealPlansCtrl = require('../controllers/mealPlans');


router.get('/', mealPlansCtrl.index);
router.get('/new', mealPlansCtrl.new);
router.get('/:id', mealPlansCtrl.show);
router.get('/:id/edit', mealPlansCtrl.edit);
router.post('/', mealPlansCtrl.create);
router.post('/:id/recipes', mealPlansCtrl.addRecipe);
router.put('/:id', mealPlansCtrl.update);
router.delete('/:id', mealPlansCtrl.delete);
router.delete('/:id/recipes/', mealPlansCtrl.removeRecipe);


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