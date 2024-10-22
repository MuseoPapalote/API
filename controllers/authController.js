const passport = require('passport');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const userModel = require('../models/userModel');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) =>{
        try {
            let user = await userModel.findUserByGoogleId(profile.id)
            if(!user){
                const existeUsuario = await userModel.findUserByEmail(profile.emails[0].value);
                if(existeUsuario){
                    return done(null, false, 'El correo ya está registrado')
                };
                user = await userModel.createUserByGoogle({
                    nombre: profile.displayName,
                    email: profile.emails[0].value,
                    google_id: profile.id
                });
            }
            const token = jwt.sign({id_usuario: user.id_usuario}, process.env.JWT_SECRET, {expiresIn: '24h'});
            return done(null,{user, token});
        } catch(error){
            console.log('Error durante la autenticación con Google:', error);
            return done(error);
        }
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
    },
    async(accessToken, refreshToken, profile, done) =>{
        try{
            let user = await userModel.findUserByFacebookId(profile.id);
            if(!user){
                const existeUsuario = await userModel.findUserByEmail(profile.emails[0].value);
                if(existeUsuario){
                    return done(null, false, {message: 'El correo ya está registrado'});
                }
                user = await userModel.createUserByFacebook({
                    nombre: profile.displayName,
                    email: profile.emails[0].value,
                    facebook_id: profile.id
                });
            }

            const token = jwt.sign({id_usuario: user.id_usuario}, process.env.JWT_SECRET, {expiresIn: '24h'});
            return done(null, {user, token});
        } catch(error){
            console.log('Error durante la autenticación con Facebook:', error);
            return done(error);
        }
    }
));


// passport.serializeUser((user, done) => {
//     done(null, user.id_usuario);
// })

// passport.deserializeUser(async (id_usuario, done) => {
//     try{
//         const user = await userModel.findUserById(id_usuario);
//         done(null, user);
//     } catch(error){
//         done(error);
//     }
// })