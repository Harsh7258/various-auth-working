const GoogleStatergy = require("passport-google-oauth20").Strategy
const mongoose = require("mongoose")
const User = require("../models/auth")

module.exports = function (passport) {
    passport.use(new GoogleStatergy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/google/callback',
            proxy: true, // Trust proxy for development (see Passport.js docs)
          },
          async (accessToken, refreshToken, profile, done) => {
            // console.log(profile.photos.value)
            try {
              // Check if user exists in database based on Google ID
              const existingUser = await User.findOne({ googleId: profile.id });
              if (existingUser) {
                return done(null, existingUser);
              }
          
              // Create a new user with Google profile data
              const newUser = new User({
                name: profile.displayName,
                googleId: profile.id,
                imageUrl: profile.photos[0].value
              });
              const savedUser = await newUser.save();
              return done(null, savedUser);
            } catch (err) {
              return done(err, null);
            }
    }))
    passport.serializeUser((user, done) => {
        done(null, user.id)
      })
    
      passport.deserializeUser(async (id, done) => {
        try {
          const user = await User.findById(id);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      });
      
}
