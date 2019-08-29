const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

router.get('/', isAdmin, usersCtrl.index);
router.get('/add', usersCtrl.new);
router.get('/:id', isLoggedIn, usersCtrl.show);
router.get('/:id/edit', isAdmin, usersCtrl.edit);
router.post('/', usersCtrl.create);
router.put('/:id', isAdmin, usersCtrl.update);
router.delete('/:id', isAdmin, usersCtrl.delete);

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