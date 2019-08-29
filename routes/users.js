const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.index);
router.get('/add', usersCtrl.new);
router.get('/:id', usersCtrl.show);
router.get('/:id/edit', usersCtrl.edit);
router.post('/', usersCtrl.create);
router.put('/:id', usersCtrl.update);
router.delete('/:id', usersCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;