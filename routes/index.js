const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/auth/google', passport.authenticate(
    'google', { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
    'google', {
        successRedirect: '/',
        failureRedirect: '/'
    }
));

router.get('/logout', function(req, res) {
    req.logout();
    res.render('index');
});

module.exports = router;