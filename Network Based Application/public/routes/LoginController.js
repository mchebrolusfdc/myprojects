var express = require('express');
var router = express.Router();
var userinfo = require('../models/userDB');
var userconnectionDetails = require('../models/userConnectionDB');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSalt(10);

//firstName validation, to check if special characters are present
var firstNamecheck = function(firstName){
  let regexp = /[`~$%^.*_+=;<>/?|]+/;
  if(!regexp.test(firstName)){
    return firstName
  } else{
    throw new Error('Special Characters are not allowed in first name');
  }
}
//lastName validation, to check if special characters are present
var lastNamecheck = function(lastName){
  let regexp = /[`~$%^.*_+=;<>/?|]+/;
  if(!regexp.test(lastName)){
    return lastName
  } else{
    throw new Error('Special Characters are not allowed in last name');
  }
}
//password validation, to check if password and confirm password matches
var passwordcheck = function(pwd, conpwd){
  let regexp = /[`&()[\]{}"',~%^.*+=;:<>/]+/;
  let regexp1 = /[a-z]+/;
  let regexp2 = /[A-Z]+/;
  let regexp3 = /[0-9]+/;
  let regexp4 = /[_$!@#]+/;
  if(!regexp.test(pwd) && !regexp.test(conpwd)){
    if(regexp1.test(pwd) && regexp2.test(pwd) && regexp3.test(pwd) && regexp4.test(pwd)){
      if(pwd == conpwd){
          return pwd
      } else{
        throw new Error("Password and confirm password doesn't match!!");}
    } else{
        throw new Error("Password should contain atleast one uppercase, lowercase, numeric and any of the given special characters !@#$_");}
  } else{
    throw new Error('Allowed special characters in password are !@#$_');}
}
//validation on city to check special characters are not allowed
var citycheck = function(city){
  let regexp = /[`~$%^.*_+=;<>@()&!'?(\){\}[\]]+/;
  if(!regexp.test(city)){
    return where
  } else{
    throw new Error('Special characters are not allowed in city ');
  }
}
//validation on state to check special characters are not allowed
var statecheck = function(state){
  let regexp = /[`~$%^.*_+=;<>@()&!'?(\){\}[\]]+/;
  if(!regexp.test(state)){
    return where
  } else{
    throw new Error('Special characters are not allowed in state ');
  }
}
//validation on country to check special characters are not allowed
var countrycheck = function(country){
  let regexp = /[`~$%^.*_+=;<>@()&!'?(\){\}[\]]+/;
  if(!regexp.test(country)){
    return where
  } else{
    throw new Error('Special characters are not allowed in country');
  }
}
//login get method
router.get('/login', function(req,res){
res.render('login', {log:req.session.theUser, message:undefined});
})

//login post method
router.post('/login', [

  check('username').not().isEmpty().withMessage('Enter username'),//to check whether the username is empty
  check('password').not().isEmpty().withMessage('Enter password')//to check whether the password is empty

],async function(req, res){
  var error = validationResult(req);
  theUser = await userinfo.getUser(req.body.username.toLowerCase());
  if (error.isEmpty() && theUser!=null){
      if (await bcrypt.compare(req.body.password, theUser.password)){  //decrypt the pwd and checking if the user entered password and password in database are equal
        req.session.theUser = theUser;
        req.session.profile = await userconnectionDetails.getUserProfile(req.session.theUser._id); // assigning user profile data to the session
        res.redirect('/savedConnections');
      } else{
        res.render('login', {log: req.session.theUser, message: "Incorrect password. Please try again."}); //display error message if password is invalid
      }

  } else{
      console.log(error);
      res.render('login', {log: req.session.theUser, message: "Either username or password are incorrect. Please try again."});//display error message if username is invalid
  }
})

//signup/registration get method
router.get('/signup',function(req,res){
  res.render('signup', {log:req.session.theUser, message:undefined});
})
//signup post method
router.post('/signup',[
  check('firstName').custom((firstName) => {return firstNamecheck(firstName)}) //validates first name
  .isLength({max:40}).withMessage('Firstname length should not be more than 40 characters'),

  check('lastName').custom((lastName) => {return lastNamecheck(lastName)})//validates last name
  .isLength({max:40}).withMessage('Firstname length should not be more than 40 characters'),

  check('email').isEmail().withMessage('Please enter valid email'),//validates email

  check('password').isLength({min:6, max:20}).withMessage('Password length should be 6-20 characters!!') //validates password length
  .custom((value, {req}) => {return passwordcheck(req.body.password, req.body.conpassword)}).withMessage("Passwords doesn't match"),
  check('conpassword').isLength({min:6, max:20}).withMessage('Password length should be 6-20 characters!!') //validates confirm password length
  .custom((value, {req}) => {return passwordcheck(req.body.conpassword, req.body.password)}).withMessage("Passwords doesn't match")

],async function(req,res){
  var error = validationResult(req);
  if (error.isEmpty()){
    theUser = await userinfo.getUser(req.body.email); //passing email id to session variable
    if(theUser){ //validates if the email id is already in use

        res.render('signup', { log:req.session.theUser,message: "Email you entered is already in use, try with different email"});
    }
    else {

        const salt = await bcrypt.genSalt(10);
        console.log(req.body.password);
        req.body.password = await bcrypt.hash(req.body.password, salt); //hashing the password
        console.log("Hashed password"+req.body.password);
        await userinfo.newUser(req.body);
        res.render('signup', {log:req.session.theUser, message: "Registration successful, you can login now with email id as your username"});//renders signup page
    }
  }
  else{
    if(error.errors[0].msg){
      res.render('signup', {log: req.session.theUser,  message:error.errors[0].msg});//renders signup and displays errros in case if there are any
    }
  }
})

router.get('/login/*', function(req, res){
  res.redirect('/login');
})
router.get('/logout', function(req,res){

  req.session.destroy();
  res.redirect('/index'); // redirects to index page
})
.get('/logout/*', function(req, res){
  res.redirect('error',{log:req.session.theUser}); //redirects to error page
});

module.exports = router;
