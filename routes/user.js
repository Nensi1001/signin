const passport = require("passport");
const express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('user');
})

router.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile', {
        user:req.user
    });  
})

    router.get('/auth/facebook',passport.authenticate('facebook', {
        scope: ['public_profile','email']
    }));

router.get('/error', function (req, res) {
    res.send('login failed')
})

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/error'
}));
router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
})
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next 
    res.redirect('/');
}

module.exports = router;