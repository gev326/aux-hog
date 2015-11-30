var User = require('../models/user');
var Circle = require('../models/circle');
var spotify = require('../config/spotifyApiHelper');
var locus = require('locus');
var async = require('async');


var addCircleUsers = function(req, res, done){
  User.findOne(req.body, function(err, user) {
    if (err) return done(err);
    if (user) {
      res.json(user);
    } else {
      var newUser = new User({
        spotifyId: req.body.spotifyId,
        circles: []
      });
      newUser.save(function(err, user) {
        if (err) return done(err);
        res.json(user);
      });
    }
  });
};


// =======
// >>>>>>> 55636ee58450cd74e49b98d24f9cb8c1266632fb
var indexCircle = function(req, res) {
  Circle.find({}, function(err, records) {
    res.json(records);
  });
};

// <<<<<<< HEAD
var createCircle = function(req, res, done) {
  var circle = new Circle(req.body);
  circle.creator = req.user._id;
  circle.users.push(req.user._id);
  var userArray = JSON.parse(req.body.users);
  async.each(userArray, function(user){
    circle.users.push(user);
  });
  async.each(circle.users, function(user){
    User.findOne({ '_id': user }, function(err, user) {
      if (err) return done(err);
      if (user) {
        foundUser = user;
        foundUser.circles.push(circle);
        foundUser.save(function(err){
          if (err) return done(err);
        });
        console.log(foundUser);
      }
    });
  });
};
var showCircle = function(req, res){
  var id = req.params.id;
  Circle.findById(id, function(err, circle){
    console.log("GOT TO THIS");
    if (err) {
      res.send(err);
    }
    res.json(circle);
// >>>>>>> 55636ee58450cd74e49b98d24f9cb8c1266632fb
  });
};


var indexUser = function(req, res) {
  User.find({}, function(err, records) {
    res.json(records);
  });
};

module.exports = {
  indexCircle: indexCircle,
  indexUser: indexUser,
  showCircle: showCircle
}
