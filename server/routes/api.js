var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');


router.post('/register', function(req, res) {

  User.register(new User({ username: req.body.username,phone:req.body.phone,email:req.body.email,dateofbirth:req.body.dateofbirth,address:req.body.address }),
    req.body.password,function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!',
		data:res
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {

		var data = {'id':user._id,'username':user.username,'email':user.email,'phone':user.phone,'dateofbirth':user.dateofbirth,'address':user.address};
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!',
		data:data
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});


module.exports = router;