var express = require('express');
var router = express.Router();
const passport = require('passport');
const Cube = require('../models/cube');
const User = require('../models/users');


// router.get('/register', function(req, res) {
//     res.render('register', {});
//     });
    
//     router.post('/register', function(req, res, next) {
//         console.log('registering user');
//         User.register(new User({username: req.body.username}), req.body.password, function(err) {
//         if (err) {
//             console.log('error while user register!', err);
//             return next(err);
//         }
    
//         console.log('user registered!');
    
//         res.redirect('/');
//         });
//     });






router.get('/register', function(req, res, next) {
        console.log('register page');
        res.render('register', { title: 'Register Page' });
        
    });
    
    router.post('/register', function(req, res) {
        if (req.body.password === req.body.repeatPassword) {
            console.log('passwords match');
    
            User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
                if (err) {
                    return res.render('register', { error: err.message });
                }
    
                passport.authenticate('local')(req, res, function () {
                    req.session.save(function(err) {
                        if (err) {
                            return next(err);
                        }
                        res.redirect('/');
                    });
                });
            });
    
    } else {
        res.send('passwords do not match');
    }
    });


module.exports = router;

// routuer.get('/', function(req, res, next){
//     res.render('register', {title: 'Please Register'});
// });


// router.post('/', function(req, res, next) {
//     console.log("register is working", req.body);
//     let username = req.body.username;
//     let password = req.body.password;
//     let tempUser = new User({ username, password });
//     tempUser.save().then((newUser) => {
//         console.log('this is the request', newUser)
//         res.render('register', {title: 'please register'});  // NEW USER FROM DATABASE WITH THE ID FROM MONGO 
//     });
    
// })
