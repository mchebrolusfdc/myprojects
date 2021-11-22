var userProfile = function (userId, userConnectiondetails) {

  this.userId = userId
  this.userConnectiondetails = userConnectiondetails

//function to return all the connections related to a user profile
  this.getConnections = function (){
    return this.userConnectiondetails;
  };

//function to add a UserConnection to the user profile
  this.addConnection = function(userConn){
    this.userConnectiondetails.push(userConn);
  }

 //function to delete the UserConnection associated with the given connection
  this.removeConnection = function(connectionId){
    for(var i=0; i<this.userConnectiondetails.length; i++){
      if(connectionId == this.userConnectiondetails[i].connection.connectionId){
        this.userConnectiondetails.splice(i,1);
      }
    }
  }

  //function to update a UserConnection data
  this.updateConnection = function(userConn){
    for(var i=0; i<this.userConnectiondetails.length; i++){
      if(userConn.connection.connectionId == this.userConnectiondetails[i].connection.connectionId){
        this.userConnectiondetails[i].connection = userConn.connection;
        this.userConnectiondetails[i].rsvp = userConn.rsvp;
      }
    }
  }

   //function to clear the entire profile contents
  this.emptyProfile = function(){
    this.userid=null
    this.savedconnections = null
  }

}

module.exports = userProfile;
