const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

router.get('/', isLoggedIn, isAdmin, usersCtrl.index);
router.get('/add', usersCtrl.new);
router.get('/:id', isLoggedIn, usersCtrl.show);
router.get('/:id/edit', isLoggedIn, isAdmin, usersCtrl.edit);
router.post('/', usersCtrl.create);
router.put('/:id', isLoggedIn, isAdmin, usersCtrl.update);
router.delete('/:id', isLoggedIn, isAdmin, usersCtrl.delete);

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