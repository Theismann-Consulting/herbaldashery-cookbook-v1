const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const ingredientsCtrl = require('../controllers/ingredients');


router.get('/', recipesCtrl.index);
router.get('/new', recipesCtrl.new);
router.get('/:id', recipesCtrl.show);
router.get('/:id/edit', recipesCtrl.edit)
router.post('/', recipesCtrl.create);
router.put('/:id', recipesCtrl.update)
router.delete('/:id', recipesCtrl.delete, ingredientsCtrl.clean);


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