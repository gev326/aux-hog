// var mongoose = require('./config/database');

// var User = require('./models/user');

// var users = [
//   {
//   display_name: "Ben Benjamin",
//   spotifyId: "beineken",
//   profile_image: "https://scontent.xx.fbcdn.net/hprofile-xap1/v/t1.0-1/p200x200/1012989_10153159557102664_6156379247819893088_n.jpg?oh=e4442eb297ef7cb5561f945edcb9ec53&oe=56E3E40E",
//   // email: String,
//   }
// ];



// User.remove({}, function(err) {
//   if (err) console.log(err);
//   User.create(users, function(err, users) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Database seeded with " + users.length  + " users.");
//       mongoose.disconnect();
//     }
//   });
// });


var mongoose = require('./config/database');

var User = require('./models/user');
var Circle = require('./models/circle');

var seedUsers = [
  {
  displayName: "Ben Benjamin",
  email: "agugugachu@gmail.com",
  spotifyId: "beineken",
  profileImage: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p200x200/1012989_10153159557102664_6156379247819893088_n.jpg?oh=e4442eb297ef7cb5561f945edcb9ec53&oe=56E3E40E&__gda__=1458445297_8927a69023561abff3566cbd41ef06ec",
  accessToken: "BQBvtjI57sR71lvTEhA-H0CjtclrtU1g3PQVI_Mar4UDgbdnGrm-gPIoCJAoNeG7k1-87VlqR5wp9RqKvkmBoOZs5X8bvIUiF_GDa5GeTYEHfKPRQ1iKXUayxb4tMShzpweK4KOiNm3wgQwJuNwnClvAgThJ",
  circles: []
  },
  {
  displayName: "Gev Gharadaghi",
  email: "gev3206@gmail.com",
  spotifyId: "gev326",
  profileImage: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p200x200/1012989_10153159557102664_6156379247819893088_n.jpg?oh=e4442eb297ef7cb5561f945edcb9ec53&oe=56E3E40E&__gda__=1458445297_8927a69023561abff3566cbd41ef06ec",
  accessToken: "BQAB06UFKhU3FM8ckuWBDP5fVHiICFyNH8XiqhacDPBhkGCVr1fIOoAFWvASGl2sz7wW3jVJeflz3ZbBclsY557vFw94wnYESt8x4HBMFlmtYJcUfk4f-gebaE6Sl3F20eYHRbIfs2V5",
  circles: []
  }
];

var seedCircles = [
  {
  title:   "test",
  creator: null,
  users: []
  }
];

User.remove({}, function(err) {
  Circle.remove({}, function(err) {
    if (err) console.log(err);
    User.create(seedUsers, function(err) {
      User.find({}, function(err, users) {
        console.log(users);
        Circle.create(seedCircles, function(err, circles) {
          users.forEach(function(user) {
            user.circles.push(circles[0]);
            circles[0].users.push(user);
            user.save(function(){
              console.log('user saved!')
            });
          })
          circles[0].creator = users[0].id;
          circles[0].save(function() {
            console.log("Database seeded with " + users.length  + " users.");
            mongoose.disconnect();
          });
        });
      });
    });
  });
});
