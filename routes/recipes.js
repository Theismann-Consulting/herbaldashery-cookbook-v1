const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const ingredientsCtrl = require('../controllers/ingredients');


router.get('/', isLoggedIn, recipesCtrl.index);
router.get('/new', isContributor, recipesCtrl.new);
router.get('/:id', isLoggedIn, recipesCtrl.show);
router.get('/:id/edit', isContributor, recipesCtrl.edit);
router.post('/', isContributor, recipesCtrl.create);
router.put('/:id', isContributor, recipesCtrl.update);
router.delete('/:id', isAdmin, recipesCtrl.delete, ingredientsCtrl.clean);


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