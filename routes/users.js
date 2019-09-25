var express = require('express');
var router = express.Router();


var Datastore = require('nedb')
  , db = new Datastore({ filename: './data/users2.db' , autoload: true });


/* GET users listing. */
router.get('/', function(req, res, next) {

  db.find({}, function (err, docs) {
    var data  =  docs.map(function (doc) {
      return {
        ownerid : doc.email
      }
    })    
    
    res.json(data);
  });
});


/* GET users listing. */
router.get('/all', function(req, res, next) {

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

router.post('/login' , function(req, res, next) {
  var user =  req.body
 
  db.find({email : user.email , pass: user.pass}, function (err, docs) {   // Callback is optional
   if(docs.length > 0) {
    res.json({login: true, username : user.email , loggedinTime : new Date() , name : docs[0].name});
    return;
   }else{
    res.json({login: false});
   }
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
