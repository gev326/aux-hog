var SpotifyStrategy = require('passport-spotify').Strategy;
var User = require('../models/user');

var debug = require('debug')('app:oauth');

module.exports = function(passport) {
  passport.use(new SpotifyStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ 'spotifyId': profile.id }, function(err, user) {
      if (err) return done(err);
      if (user) {
        debug("OAuth successful, found user: ", user.displayName);
        return done(null, user);
      } else {
        debug("OAuth successful, user not found!");

        var newUser = new User({
          displayName: profile.displayName || profile.username,
          email:       profile.emails[0].value,
          spotifyId:   profile.id
        });

        newUser.save(function(err, user) {
          debug("User created: ", user);

          if (err) return done(err);
          return done(null, user);
        });
      }
    });
  }));

  passport.serializeUser(function(user, done) {
   done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
}


// Check with data model and schema to integrate
// userid with displayname from spotify

