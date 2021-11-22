var express = require('express');
var router = express.Router();
var connectionInfo = require('../models/connectionDB');
var userInfo = require('../models/userDB');
var userConnection = require('../models/userConnection');
var userconnectionDetails = require('../models/userConnectionDB');

//saved connections get method
router.get('/savedconnections',async function(req,res){
  if(!req.session.theUser || !req.session.profile){ // it checks if theUser and profile are present in session
    req.session.destroy(); // removing session data
    res.redirect('/'); // redirect to homepage
  } else{
    req.session.profile = await userconnectionDetails.getUserProfile(req.session.theUser._id); //assigning profile again as functions are missing when route changes
    var newconn=await connectionInfo.getNewConnection(req.session.theUser._id);
    if(newconn.length==0)
    {
      newconn=undefined;
    }
    res.render('savedconnections',{userinfo:req.session.profile, log:req.session.theUser, newconn:newconn }); // render savedConnections page
  }
})

//saved connections post method
router.post('/savedconnections',async function(req,res){
  if(!req.session.theUser || !req.session.profile){ // it checks if theUser and profile are present in session
    res.redirect('/error');
  } else{
    console.log("in savedconnections post method");
    let connection = await connectionInfo.getConnection(req.query.connectionID);
    console.log(req.query.connectionID);
    if (connection && (['Yes','No','Maybe'].includes(req.query.rsvp))){
    let userConnectionId = [];   // assign userconnection IDs in a local variable
    req.session.profile.forEach(function(c){
      userConnectionId.push(c.connection._id);
    });
    console.log(userConnectionId);
    if (userConnectionId.includes(req.query.connectionID)) { // it checks if the given connectionID is in the profile or not
      await userconnectionDetails.updateRSVP( req.query.connectionID, req.session.theUser._id,req.query.rsvp);
    } else{
      await userconnectionDetails.addRSVP( req.query.connectionID, req.session.theUser._id,req.query.rsvp); // if connectionID is not present then it adds profile
    }
  }
    req.session.profile = await userconnectionDetails.getUserProfile(req.session.theUser._id); //assigning user profile as route changes
    res.redirect('/savedconnections'); //redirects to saved connections page
  }
})

//get method to delete the connections owned by the user
.get('/savedconnections/delete',async function(req, res){
 if (req.query.connectionID){
     try{
       let condata = await connectionInfo.getConnection(req.query.connectionID);  //gets the connection based on connection id
       if(condata.CreatedBy === req.session.theUser._id){   //validates if CreatedBy and the user id are equal
         await userconnectionDetails.deleteConnection(req.query.connectionID, req.session.theUser._id);  // if yes, then delete the connection
         await userconnectionDetails.deleteallRSVP(req.query.connectionID);  //deletes all the RSVP's
       }
       else{
         await userconnectionDetails.deleteRSVP(req.query.connectionID, req.session.theUser._id);  //else deletes only RSVP

       }
   req.session.profile = await userconnectionDetails.getUserProfile(req.session.theUser._id); //assigning user profile as the route changes
   res.redirect('/savedconnections');
 }
 catch(error){
   console.error(error);
 }
 }
 else{
   res.redirect('/savedconnections'); //redirects to savedconnections page
 }
});

module.exports = router;
