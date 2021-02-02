var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

var theAccessory;


// console.log("NEWACCCC 000------------------------------------------", theAccessory);

router.get('/:id', function(req, res, next) {
  Cube.findOne({_id: req.params.id}).populate('accessories')  
  .then((response) => {
    Accessory.find().then((response) => {
        theAccessory = response
        console.log('Cube to attach accessory to ', response)
        res.render('attachAccessory', { title: 'Attach Accessory', cube: response, accessory: theAccessory });
      });
    })

});


router.post('/:id', function(req, res, next) {
  console.log('The attach form is ', req.body, req.params.id)
  Cube.findByIdAndUpdate({_id: req.params.id})
});


module.exports = router;
