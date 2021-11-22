var connectModel = require('./connection');
const mongoose = require('mongoose');

// creating schema with collection name that is already present
const connectionsSchema = new mongoose.Schema({
  '_id':{type: String, required: true},
  'Name' : {type: String, required: true},
  'Topic' : {type: String},
  'Date' : {type: String},
  'Time' : {type: String},
  'Address' : {type: String},
  'Image' : {type: String},
  'HostedBy' : {type: String},
  'CreatedBy':{type: String},
  'Going' : {type: Number},
  'Description' : {type: Array},
},{collection:'Connections'});

// creating model to handle connections information
const connections = mongoose.model('Connections', connectionsSchema);

// function to get all the connections data
async function getConnections(){
  try{
      let allconnections = await connections.find();
      console.log("Getusers method in connectionDB");
      console.log(allconnections);

      return allconnections;
  }
  catch(err){
    console.error(err);
    return 0;
  }
}

// function to get connection data based on the id provided
async function getConnection(ConnectionId){
  try{
     let connection = await connections.findById(ConnectionId);
     return connection;
  }
  catch(err){
    console.error(err);
    return 0;
  }
}

 //function to send all the connections data based on given category name
async function getConnectionsCatgry(catgryname){
  try{
    let allconns = await connections.find({"Topic":catgryname});
    return allconns;
  }
  catch(error){
    console.error(error);
    return 0;
  }
}

//function to get the connections by comparing createdby field
async function getNewConnection(createdBy){
  try{

     let connection = await connections.find({CreatedBy:createdBy});
     if(connection!=null){
    return connection;
   }
   else {
     return null;
   }
  }
  catch(error){
    console.error(error);
    return 0;
  }
}

module.exports = {getConnections, getConnection, connections, getNewConnection, getConnectionsCatgry};
