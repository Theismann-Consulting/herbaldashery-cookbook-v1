const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOne({ 'email': profile._json.email }, function(err, user) {
            if (err) return cb(err);
            if (user) {
                if (!user.googleId) {
                    user.name = profile.displayName,
                    user.googleId = profile.id,
                    user.avatar = profile.photos[0].value;
                    user.save(function(err) {
                        return cb(null, user);
                    });
                } else {
                    return cb(null, user);
                }
            } else {
                return cb(null);
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});