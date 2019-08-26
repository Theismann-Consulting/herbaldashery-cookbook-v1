const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.index);

router.get('/auth/google', passport.authenticate(
    'google', { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
    'google', {
        successRedirect: '/recipes',
        failureRedirect: '/recipes'
    }
));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('users');
});

module.exports = router;