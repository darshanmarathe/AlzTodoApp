var express = require('express');
var router = express.Router();


var Datastore = require('nedb')
  , db = new Datastore({ filename: './data/users2.db' , autoload: true });


/* GET users listing. */
router.get('/', function(req, res, next) {

  db.find({}, function (err, docs) {
        res.json(docs);
  });
});


/* GET users listing. */
router.get('/:email', function(req, res, next) {
  var email = req.params.email;
  db.find({email : email}, function (err, docs) {
        res.json(docs);
  });
});
router.post('/' , function(req, res, next) {
  db.insert(req.body, function (err, newDoc) {   // Callback is optional
   res.json(newDoc)
  });
})


router.put('/' , function(req, res, next) {
  var user = req.body;
  db.update({_id : user._id} , user , function (err, numReplaced) {   // Callback is optional
   res.json(user)
  });
})

router.delete('/:id' , function(req , res, next) {
  var id  =  req.params.id;
  db.remove({_id : id} , function (err , numReplaced) {
    res.json({deleted : true});
  })
});

module.exports = router;
