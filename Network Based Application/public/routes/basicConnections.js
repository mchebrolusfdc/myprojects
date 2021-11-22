var express = require('express');
var router = express.Router();

//it redirects to the home page
router.get('/',function(req,res){
  res.redirect('/index');
})

//it renders the home page and also examines if the variable "theUser" is in session
.get('/index',function(req,res){
  res.render('index', {log: req.session.theUser});
})

//it renders about page and also examines if the variable "theUser" is in session
.get('/about',function(req,res){
  res.render('about', {log: req.session.theUser});
})

//it renders contact page and also examines if the variable "theUser" is in session
.get('/contact',function(req,res){
  res.render('contact', {log: req.session.theUser});
});

module.exports = router;
