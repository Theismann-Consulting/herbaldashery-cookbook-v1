const express = require('express');
const router = express.Router();
const ingredientsCtrl = require('../controllers/ingredients');

router.post('/', isLoggedIn, isContributor, ingredientsCtrl.create);
router.put('/:id', isLoggedIn, isContributor, ingredientsCtrl.update)
router.delete('/:id', isLoggedIn, isAdmin, ingredientsCtrl.delete);

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