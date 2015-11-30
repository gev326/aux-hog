var SpotifyStrategy = require('passport-spotify').Strategy;
var User = require('../models/user');

var debug = require('debug')('app:oauth');

module.exports = function(passport) {
  passport.use(new SpotifyStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://peaceful-tor-6779.herokuapp.com/callback" // change from localhost/3000 to web site addy
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ 'spotifyId': profile.id }, function(err, user) {
      if (err) return done(err);
      if (user) {
        debug("OAuth successful, found user: ", user.displayName);
        user.accessToken = accessToken;
      //  user.save(function(user){
        return done(null, user);
    //  })

      } else {
        debug("OAuth successful, user not found!");

// <<<<<<< HEAD
        var image;
        function getImage() {
          if (profile.images.length > 0) {
            image = profile.images[0].url;
          } else {
            image = 'http://www.sessionlogs.com/media/icons/defaultIcon.png'
          }
        }
        getImage();

        // var image;
        // function getImage() {
        //   if (profile.images.length > 0) {
        //     image = profile.images[0].url;
        //   } else {
        //     image = 'http://www.sessionlogs.com/media/icons/defaultIcon.png'
        //   }
        // }
        // getImage();
// >>>>>>> 55636ee58450cd74e49b98d24f9cb8c1266632fb

        var newUser = new User({
          displayName: profile.displayName || profile.username,
          email:       profile.emails[0].value,
          spotifyId:   profile.id,
// <<<<<<< HEAD
          profileImage: image,
// =======
          profileImage: null,
// >>>>>>> 55636ee58450cd74e49b98d24f9cb8c1266632fb
          circles: []
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
   done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
    done(null, user);
  })
  });
}
