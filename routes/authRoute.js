const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.get('/google', 
    passport.authenticate('google', {scope: ['profile', 'email'], session: false})
);
router.get('/google/callback', 
    passport.authenticate('google', {failureRedirect: '/', session: false}),
    (req, res) => {
        const {user,token} = req.user;
        res.json({user,token});
        res.redirect('/dashboard');
    }
);

router.get('/facebook',
    passport.authenticate('facebook', {scope: ['email'], session: false})
);
router.get('/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/', session: false}),
    (req, res) => {
        const {user, token} = req.user;
        res.json({user, token});
        res.redirect('/dashboard');
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;