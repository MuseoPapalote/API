const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/userModel');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) =>{
        try {
            let user = await userModel.findUserByGoogleId(profile.id)
            if(!user){
                user = await userModel.createUserByGoogle({
                    nombre: profile.displayName,
                    email: profile.emails[0].value,
                    google_id: profile.id
                });
            }
            return done(null,user)
        } catch(error){
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id_usuario);
})

passport.deserializeUser(async (id_usuario, done) => {
    try{
        const user = await userModel.findUserById(id_usuario);
        done(null, user);
    } catch(error){
        done(error);
    }
})