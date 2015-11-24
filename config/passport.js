var SpotifyStrategy = require('passport-spotify').Strategy
var User = require('../models/user')

module.exports = function(passport) {
  passport.use(new SpotifyStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/callback"
  },

  function(accessToken, refreshToken, profile, done) {
      User.findOne({'spotifyId': profile.id}, function(err, user) {
        if(err) return done(err);
        if(user){
            console.log(user);
            return done(null, user);
        } else{
            var newUser = new User ({
              name: profile.displayName,
              spotifyId: profile.id,
              playlist: playlist.id
            });
            newUser.save(function(err){
              if(err) return done(err);
              console.log(newUser);
              return done(null, newUser);
            });

      }
      });
    }));
    // User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
}


// Check with data model and schema to integrate
// userid with displayname from spotify

 // process.nextTick(function(){
 //      return done(null, profile);
