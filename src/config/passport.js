const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const UserGoogle = require('../app/models/UserGoogle');



module.exports = function (passport) {

    passport.use(new GoogleStrategy({
        clientID: '90930972268-isl2p1cck7s7faq9nc0dresfi1fqp94v.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "https://kingofmelody-8911b7a7e907.herokuapp.com/login/google/callback",
        scope: ['profile', 'email']
    },
        async (accessToken, refreshToken, email, profile, done) => {
            let username = profile.displayName.replace(/\s/g, '_');
            console.log(profile)
            console.log(profile.emails[0])
            const newUserGoogle = {
                googleId: profile.id,
                username: username,
                email: profile.emails[0].value
            }

            await UserGoogle
                .findOne({googleId: profile.id})
                .then(async (user) => {
                    if (user) {
                        done(null, user);
                    } else {
                        await UserGoogle.create(newUserGoogle)
                                    .then(user => done(null, user))
                                    .catch(err => console.log('error: ', err))
                    }
                })
                .catch(err => console.log('error: ', err))
        }
        )
    );


    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser(async (id, done) => {
        done(null, await UserGoogle.findById(id))
    })
}