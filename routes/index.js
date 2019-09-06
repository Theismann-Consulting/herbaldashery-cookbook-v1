const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res){
    res.render('index', {
        contributor: req.user,
    });
});

//Google Auth
router.get('/auth/google', passport.authenticate(
    'google', { scope: ['profile', 'email'] }
));


router.get('/oauth2callback', passport.authenticate(
    'google', {
        successRedirect: '/',
        failureRedirect: '/login_failure'
    }
));
//End Google Auth

router.get('/login', function(req, res){
    res.render('login', {
        contributor: req.user,
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/login_failure', function(req, res){
    res.render('login_failure', {
        contributor: req.user,
    });
});

router.get('/privacy-policy', function(req, res){
    res.render('privacypolicy', {
        contributor: req.user,
    });
});


//Begin Facebook Auth

router.get('/auth/facebook', passport.authenticate(
    'facebook', { scope: ['public_profile', 'email'] }
));

router.get('/auth/facebook/callback',
  passport.authenticate(
    'facebook', { 
        successRedirect: '/',
        failureRedirect: '/login_failure' 
    }
));


module.exports = router;