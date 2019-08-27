const express = require('express');
const router = express.Router();
const ingredientsCtrl = require('../controllers/ingredients');

router.post('/', ingredientsCtrl.create);
router.put('/:id', ingredientsCtrl.update)
router.delete('/:id', ingredientsCtrl.delete);

function isLoggedIn(req, res, next) {
    console.log(req.user);
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

function isAdmin(req, res, next) {
    console.log(req.user);
    if (req.user.role === 'Admin') return next();
    res.redirect('/recipes');
}

function isContributor(req, res, next) {
    console.log(req.user);
    if (req.user.role === 'Contributor' || req.user.role === 'Admin') return next();
    res.redirect('/recipes');
}
module.exports = router;