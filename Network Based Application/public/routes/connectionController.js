var express = require('express');
var router = express.Router();
var connectionDetails = require('../models/connectionDB');
var userDBdetails = require('../models/userDB');
var userconnectionDetails = require('../models/userConnectionDB');
const bcrypt = require('bcryptjs');
const {check, validationResult } = require('express-validator');
const salt = bcrypt.genSaltSync(10);

//function to gather all the data related to connections
async function Connectionsdata(){
  var connectionInfo = {};
  var allconn = await connectionDetails.getConnections();
  allconn.forEach(function(con){
    if (con.Topic in connectionInfo){
      connectionInfo[con.Topic].push([con.Name,con._id]);
    } else{
      connectionInfo[con.Topic] = [[con.Name,con._id]];
    }
  });
  return connectionInfo;
}

//function to render the connection page
async function IdValidation(req,res,connId){
  var connId = String(req.query.connectionID).match(/^[a-z0-9]+$/);
  var connData = await connectionDetails.getConnection(req.query.connectionID);
  if(connData !== undefined && connData != null){
    res.render('connection', {data: connData, log: req.session.theUser});
  } else{
    res.redirect('/connections');
  }
}

//special characters not allowed in connection name
var namecheck = function(name){
  let regex = /[`~$%^.*_+=;<>/?|]+/;
  if(!regex.test(name)){
    return name
  } else{
    throw new Error('Connection name should not contain special characters');
  }
}
//special characters not allowed in topic
var topiccheck = function(topic){
  let regex = /[`,~!|@$%^.*_+=;<>/?(\){\}[\]]+/;
  if(!regex.test(topic)){
    return topic
  } else{
    throw new Error('Topic field should not contain special characters');
  }
}
//special characters not allowed in address
var addresscheck = function(address){
  let regex = /[`~$%^.*_+=;<>@()&!'?(\){\}[\]]+/;
  if(!regex.test(address)){
    return address
  } else{
    throw new Error('Address field should not contain special characters');
  }
}


//get method for newConnection
router.get('/newConnection',function(req,res){
  res.render('newConnection', {log: req.session.theUser,connection:undefined, message:undefined});   //it renders new connection page

})

//post method for newConnection
router.post('/newConnection',[
  check('Name').custom((Name) => {return namecheck(Name)}),
  check('Name', 'Name should not be less than 5 characters').isLength({min:5}), // validates length of name

  check('Topic').custom((Topic) => {return topiccheck(Topic)}),
  check('Topic', 'Topic should not be less than 5 characters').isLength({min:5}), // validates length of topic

  check('Description', 'Please provide a brief description of your event').not().isEmpty(), // validates Description

  check('Address').custom((Address) => {return addresscheck(Address)}),
  check('Address', 'Address should not be less than 5 characters').isLength({min:5}), // validates Address length
  check('Address', 'Please provide a valid address').not().isEmpty(), // validates address

  check('Date', "Date should not be past date, it should be today's date or future date").isAfter() // validates Date is today or future date
], async function(req,res){
  const error = validationResult(req);
  if (error.isEmpty()){
    console.log("user details");
    console.log(req.session.theUser);
    if(req.session.theUser){

      if(req.query.connectionID){
      try{

        console.log(req.body);
        await userconnectionDetails.updateConnection(req.body, req.query.connectionID, req.session.theUser._id); //to update the connection
        res.render('newConnection', {log: req.session.theUser,connection: undefined, message:"Connection updated successfully"});
      }
      catch(err){
        console.error(err);
      }
    }else{
        try{
          await userconnectionDetails.addConnection(req.body, req.session.theUser);
          res.render('newConnection', {log: req.session.theUser,  connection: undefined, message:"Connection created successfully"});
        }
        catch(err){
          console.error(err);
        }
      }
    }
    else{
      res.render('newConnection', {log: req.session.theUser, connection: undefined, message:"Please login to create a new connection"});
    }
  }
  else{
    console.log(error);
    if(error.errors[0].msg){
      res.render('newConnection', {log: req.session.theUser,connection: undefined, message:error.errors[0].msg});
    }
  }

})

//get method to display connections when particular category is clicked
router.get('/connections/:categoryname', async function(req,res){ //route to display connections when respective button os clicked
  if(req.params.categoryname){
    var allconnections = await connectionDetails.getConnectionsCatgry(req.params.categoryname);
    if(allconnections.length !== 0){
      var con = await Connectionsdata(allconn);
      res.render('connections',{data:con, log: req.session.theUser});
    } else{
      res.redirect('/connections');
    }
  } else{
    res.redirect('/connections');
  }
})

 // function to render connections page with the data
router.get('/connections',async function(req,res){
  console.log(req.query.connectionID);
  if(req.query.connectionID){
    await IdValidation(req,res,req.query.connectionID);
  } else{
    var allconnections = await connectionDetails.getConnections(); //to get all the connections details available
    var Conn = await Connectionsdata(allconnections);
    res.render('connections',{data:Conn, log: req.session.theUser}); //renders connections page
  }
});

//function to update the new connection
router.get('/newConnection/update', async function(req,res){
  if(req.session.theUser && req.query.connectionID){
    try{
      let condata = await connectionDetails.getConnection(req.query.connectionID);//get the connection from database based on the connection id
      res.render('newConnection', {log: req.session.theUser, connection:condata, message:undefined});  //renders new connection page for user so that he/she can update connection
    }
    catch(error){
      console.error(error);
    }
  } else{
    res.render('newConnection', {log: req.session.theUser, connection:undefined, message:"Not able to update the connection, please try again"});
  }
})

module.exports = router;
