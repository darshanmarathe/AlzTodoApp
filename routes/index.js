var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ALZ Todo App' });
});


/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'ALZ Todo App - Login' });
});


/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'ALZ Todo App- Register' });
});

module.exports = router;
