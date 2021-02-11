var express = require('express');
var router = express.Router();
const passport = require('passport');
const Cube = require('../models/cube');
const User = require('../models/users');

// router.get('/login', function(req, res, next) {
//     res.render('login', { title: 'Login Page', loggedInUser: req.user });
//   });
  
//   router.post('/login', passport.authenticate('local'), function(req, res) {
//     res.redirect('/');
//   });
  
router.get('/login', function(req, res) {
    res.render('login', {user: req.user, message: req.flash('error')});
  });
  
  router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
      res.redirect('/');
    });

module.exports = router;