var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

var theAccessory;


// console.log("NEWACCCC 000------------------------------------------", theAccessory);

router.get('/:id', function(req, res, next) {
  console.log("ATTACHING ACCESSORY ")


  Cube.findOne({_id: req.params.id}).populate('accessories')  
  .then((responseCube) => {
    console.log(responseCube); 

    let idArr = responseCube.accessories.map(a => {return a._id;});  // array with ids of accs


    Accessory.find()
    .then((response) => {
        let dropAcc = response.filter(acc => !idArr.includes(acc._id));

        //theAccessory = response
        console.log('Cube to attach accessory to ', response)
        res.render('attachAccessory', { title: 'Attach Accessory', cube: responseCube, dropAcc: dropAcc});
      });


    });
});


router.post('/:id', function(req, res, next) {
  console.log("ATTTAVCH ACC POST _____________________-----------------------")
  console.log('The attach form is ', req.body, req.params.id)
  let selId = req.body.accessory;
  let cubeId = req.params.uid;
  console.log('cube id-----------------------', cubeId, '-------------selected Accessory Id', selId);

  Cube.findByIdAndUpdate(  // update the cube 
    {_id: cubeId},
    { $push: {"accessories": selId}}, 
    { upsert: true }, 
    function(err) {if (err) console.log(err)
    });

  Accessory.findByIdAndUpdate(  /// update the acc 
    {_id: selId},
    { $push: {"accessories": cubeId}}, 
    { upsert: true }, 
    function(err) {if (err) console.log(err)
    })

});


module.exports = router;
