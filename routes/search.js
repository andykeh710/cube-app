var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

router.get('/', function(req, res, next) {
    console.log('search get');
    let searchQuery = req.query;
    console.log('search text:', searchQuery.search);
    console.log('from', searchQuery.from, 'to', searchQuery.to);
    let min = searchQuery.from;
    let max = searchQuery.to;
    let text = searchQuery.search;     


    if (text == '' && min == '' && max == '') {
            res.redirect('/');
    } else {
        Cube.find({'name': new RegExp(text, "i")}) //
        .then((cubes) => {
            console.log(cubes);
            res.render('search', { title: 'Results', cube: cubes, loggedInUser: req.user });
        })
        .catch((err) => console.log(err));
    }
});

module.exports = router;
