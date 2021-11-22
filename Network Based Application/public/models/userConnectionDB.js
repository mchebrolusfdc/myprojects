let connectionDB = require('./connectionDB');
let userDB = require('./userDB');
let userConnection = require('./userConnection');
let userprofile = require('./userProfile');

const mongoose = require('mongoose');

//Schema creation for user connections
usrConnectionsSchema = new mongoose.Schema({
  userid : {type : String, required: true},
  connection :{type: String, required: true, ref:'Connections'},
  rsvp : {type : String, required: true}
},{collection:'UserConnections'});

// model for user connections
userConnections = new mongoose.model('UserConnections', usrConnectionsSchema);

//function to get userProfile of the userid provided
 async function getUserProfile(userID){
  try{
     return await userConnections.find({userid:userID}).populate('connection');
  }
  catch(error){
    console.error(error);
  }
}

//function to add the RSVP
async function addRSVP(ConnectionID, userID, rsvp){
  try{
    const user = await userDB.users.findById(userID);
    var connection = await connectionDB.getConnection(ConnectionID);
    if (!user) {
      console.error("User ID not found");
      return undefined;
    } else{
      let userconnections = new userConnections({userid:userID, connection:ConnectionID, rsvp:rsvp});
      let conData = await userconnections.save(); // to save data to database
      return conData;
    }

  }
  catch(error){
    console.error(error);
  }
}

//function to update the RSVP
 async function updateRSVP(ConnectionID, userID, rsvp){
  try{
    console.log("update RSVP in userconnectionDB");
    const connection = await connectionDB.getConnection(ConnectionID);
    console.log(connection);
    if (!connection) {
      console.error("Connection ID not found");
      return undefined;
    }

    let conData = await userConnections.updateOne({connection:ConnectionID, userid:userID}, {$set: {rsvp : rsvp}}); // to update connection in UserConnections collections
    return conData;
  }
  catch(err){
    console.error(err);
  }
}

//function to delete the RSVP
 async function deleteRSVP(ConnectionID, userID){
  try{
    console.log("delete");
    console.log(ConnectionID);
    console.log(userID);
    const connection = await userConnections.findOne({connection:ConnectionID, userid:userID}); // to find connection in UserConnections collections
    console.log("after await");
    console.log(ConnectionID);
    console.log(connection);
    console.log(userID);
    if (!connection) {
      console.error("UserConnection ID not found");
      return undefined;
    }
    let conData = await userConnections.deleteOne({connection:ConnectionID, userid:userID}); // to delete connection in UserConnections collections
    return conData;
  }
  catch(err){
    console.error(err);
  }
}

//function to generate random connectionID
function AutoConnectionIdGen(topic){
  var n1=Math.round(Math.random() * 10);
  var n2=Math.round(Math.random() * 1000);
  var add=n1+n1;
  var str=(topic.replace('Sports', '')).toLowerCase()+"00"+((add).toString());
  return str;
}

//function to add new connection
async function addConnection(Connection, user){
  try{
    var connid = await AutoConnectionIdGen(Connection.Topic);
      console.log(connid);
      console.log("in add connection");
    let connection = connectionDB.connections(
      {

      _id: connid,
      Name:Connection.Name,
      Topic:Connection.Topic,
      Date: Connection.Date,
      Time:Connection.Time,
      Address:Connection.Address,
      Image:"/assets/images/host1.png",
      HostedBy:user.firstName +""+ user.lastName,
      CreatedBy: user._id,
      Going: 01,
      Description:Connection.Description

    });
    // save data to the database
    let conData = await connection.save();
    return conData;
  }
  catch(err){
    console.error(err);
  }
}

//function to delete the connection
 async function deleteConnection(ConnectionId, userId){
  try{
      await connectionDB.connections.findOneAndDelete({_id:ConnectionId, CreatedBy:userId}); // to find connection in UserConnections collections
    }
    catch(error){
      console.error(error);
    }
}

//function to delete all RSVP's based on the connection id
async function deleteallRSVP(ConnectionId){ //get userProfile of given userid
 try{
   var connection = await userConnections.find({connection:ConnectionId}); // to find connection in UserConnections collections
   if (!connection) {
     console.error("No RSVP's found to delete");
     return undefined;
   }
   let condata = await userConnections.deleteMany({connection:ConnectionId}); // to delete connection in UserConnections collections
   return condata;
 }
 catch(error){
   console.error(error);
 }
}
//function to update the connection that is already present
async function updateConnection(connection, ConnectionId, userId){ //get all userprofiles
try{
  await connectionDB.connections.findOneAndUpdate(
    {_id:ConnectionId, CreatedBy:userId},
    {$set:{
      Name:connection.Name,
      Topic : connection.Topic,
      Address : connection.Address,
      Date : connection.Date,
      Time: connection.Time,
      Description : connection.Description

    }});
}
catch(error){
  console.error(error);
}
}
module.exports = {getUserProfile, addRSVP, updateRSVP, deleteRSVP, addConnection, deleteConnection, deleteallRSVP, updateConnection}
