var express = require('express');
var router = express.Router();

var Datastore = require('nedb')
  , db = new Datastore({ filename: './data/users.db', autoload: true });


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'ALZ Todo App' });
});


/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'ALZ Todo App - Login' });
});

router.post('/login', function(req, res, next) {
  var user = req.body;

  db.find({ email: user.email , pass : user.pass }, function (err, docs) {
    console.log('docs' , docs);
    if(docs.length > 0){
      res.redirect("/TodosPage")
    }else{
      res.render('login', { message: 'Sorry Login Failed' });

    }
    // docs is an array containing documents Mars, Earth, Jupiter
    // If no document is found, docs is equal to []
  });
});


/* GET home page. */
router.get('/TodosPage', function(req, res, next) {
  res.render('TodosPage', { title: 'Welcome to TODO Page' });
});

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'ALZ Todo App- Register' });
});


/* GET home page. */
router.post('/register', function(req, res, next) {
  
  var doc  = req.body;
  delete doc.conpass
  db.insert(doc, function (err, newDoc) {   // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
  });
  res.render('register', { title: 'ALZ Todo App- Register' });
});


module.exports = router;
