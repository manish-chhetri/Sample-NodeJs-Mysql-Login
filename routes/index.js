var express = require('express');
var router = express.Router();

var dbConnection = require('../lib/database');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', session : req.session });
});

router.post('/login', function (req, res, next) {
   const user_email_address = req.body.user_email_address;
   const user_password = req.body.user_password;

   if (user_email_address && user_password) {
       query = "SELECT * FROM users WHERE email='"+user_email_address+"' AND password='" +user_password+ "' LIMIT 1";
       dbConnection.query(query, function (error, data) {
           if (data.length > 0) {
               req.session.user_id = data[0].id;
               req.session.user_name = data[0].user;
               res.redirect("/");
           } else {
               //res.send("Incorrect Email address/password");
               //res.redirect("/");
               res.render('index', {error_text: "Incorrect Email-Id/Password", session : req.session})
           }
           //res.end();
       });
   } else {
       //res.send("Please enter Email address and password details");
       res.render('index', {error_text: "Please enter Email-Id and Password details", session : req.session})
       //res.end();
   }
});

router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            //console.log(JSON.stringify(session))
            res.redirect('/');
        }
    });
    //req.session.destroy();
    //res.end();
});

module.exports = router