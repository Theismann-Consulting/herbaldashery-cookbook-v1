const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res){
    res.render('index', {
        contributor: req.user,
    });
});

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