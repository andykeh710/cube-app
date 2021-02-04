var express = require('express');
var router = express.Router();
var User = require('../models/user');

routuer.get('/', function(req, res, next){
    res.render('register', {title: 'Please Register'});
});


router.post('/', function(req, res, next) {
    console.log("register is working", req.body);
    let username = req.body.username;
    let password = req.body.password;
    let tempUser = new User({ username, password });
    tempUser.save().then((newUser) => {
        console.log('this is the request', newUser)
        res.render('register', {title: 'please register'});  // NEW USER FROM DATABASE WITH THE ID FROM MONGO 
    });
    
})

module.exports = router;