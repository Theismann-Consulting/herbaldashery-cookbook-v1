const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const ingredientsCtrl = require('../controllers/ingredients');


router.get('/', isLoggedIn, recipesCtrl.index);
router.get('/new', isLoggedIn, isContributor, recipesCtrl.new);
router.get('/:id', isLoggedIn, recipesCtrl.show);
router.get('/:id/edit', isLoggedIn, isContributor, recipesCtrl.edit);
router.post('/', isLoggedIn, isContributor, recipesCtrl.create);
router.put('/:id', isLoggedIn, isContributor, recipesCtrl.update);
router.delete('/:id', isLoggedIn, isAdmin, recipesCtrl.delete, ingredientsCtrl.clean);


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