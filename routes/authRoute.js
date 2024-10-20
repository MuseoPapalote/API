const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.get('/google', 
    passport.authenticate('google', {scope: ['profile', 'email']})
);
router.get('/google/callback', 
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
    res.redirect('/dashboard');
    }
);

router.get('/facebook',
    passport.authenticate('facebook', {scope: ['email']})
);
router.get('/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;