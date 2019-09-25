var express = require('express');
var router = express.Router();


var Datastore = require('nedb')
  , db = new Datastore({ filename: './data/todos.db' , autoload: true });


//TODO : we need to fix below 
/* GET users listing. */
router.get('/', function(req, res, next) {
  db.find({}, function (err, docs) {
        res.json(docs);
  });
});


/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  db.find({_id : id}, function (err, docs) {
        res.json(docs);
  });
});

router.post('/' , function(req, res, next) {
  db.insert(req.body, function (err, newDoc) {   // Callback is optional
   res.json(newDoc)
  });
})


router.put('/' , function(req, res, next) {
  var todo = req.body;
  db.update({_id : todo._id} , todo , function (err, numReplaced) {   // Callback is optional
   res.json(todo)
  });
})

router.delete('/:id' , function(req , res, next) {
  var id  =  req.params.id;
  db.remove({_id : id} , function (err , numReplaced) {
    res.json({deleted : true});
  })
});

module.exports = router;
