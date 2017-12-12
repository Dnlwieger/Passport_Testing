var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');
//amount of rounds the plain-text password goes through while it's being hashed (higher = slower)
const saltRounds = 10;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
}); 

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});

router.post('/register', function(req, res, next) {
  console.log(req.body.username);
  console.log(req.body.password);
  console.log(req.body.passwordMatch);

  const db = require('../db.js');
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
  
    db.query('INSERT INTO users (user_name, pass_word) VALUES (?, ?)', [username, hash], function(
        error, results, fields) {
        if (error) throw error; 

        res.render('register', { title: 'Registration Complete' });
      }) 
  });
});

module.exports = router;
