var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');
const User = require('../models/users');
/* GET Add Cube page. */
router.get('/', function(req, res, next) {
  console.log('add a cube')
  res.render('create', { title: 'Create a Cube ', loggedUser: req.user});
});

router.get('/accessory', function(req, res, next){
  res.render('createAccessory', {title: 'Create Accessory'});
});

router.post('/', function(req, res, next) {
  console.log("incoming form submission " , req.body);

    const newCube = new Cube({
    _id: Math.random(),
    name: req.body.name,
    description: req.body.description,
    image_url: req.body.imageUrl,
    difficulty: req.body.difficultyLevel,
    level: req.body.difficultyLevel,
    accessories: [],
    maker: req.user._id
    });
    
    newCube.save()
    res.redirect('/')
    .then((result) => {
      console.log(result)
      res.send(result)
      })
      .catch((err) => {
        res.send(err)
      })
      
});

router.get('/accessory', function(req, res, next) {
 //console.log('Create accessory');
  res.render('createAccessory', { title: 'Add Accessory', loggedUser: req.user})
});

router.post('/accessory', function(req, res, next) {
  //console.log("the accessory form is ", req.body)
  const newAcc = new Accessory({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  });
  newAcc.save()
    .then((res) => { console.log('the new accessory is ', res)})
    res.redirect('/');
})


module.exports = router;
