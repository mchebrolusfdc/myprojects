var userModel = require('./user');
const mongoose = require('mongoose');
//Schema creation for users
usrSchema = new mongoose.Schema({

  _id : {type : String, required: true},
  password : {type : String, required: true},
  firstName : {type : String},
  lastName : {type : String},
  email : {type : String, required: true},
  address : {type : String},
  city : {type : String},
  state : {type : String},
  country : {type : String},
},{collection:'Users'});

users = new mongoose.model('Users', usrSchema);

//function to add the new user 
 async function newUser(User){
  try{
    let user = new users(
      {
        _id:User.email,
        Name:User.Name,
        password : User.password,
        firstName : User.firstName,
        lastName : User.lastName,
        email : User.email,
        address: User.address,
        city : User.city,
        state : User.state,
        country : User.country,
        Image : User.Image,

    });
    // to save data to database
    let userdata = await user.save();
    return userdata;
  }
  catch(err){
    console.error(err);
  }
}


// function to get all users data
 async function getAllUsers(){
  try{
     let allusers = await users.find();
     return allusers;
  }
  catch(err){
    console.error(err);
    return 0;
  }
};

// function to get user data based on the given userid
 async function getUser(userId){
  try{
     let user = await users.findById(userId);
     return user;
  }
  catch(err){
    console.error(err);
    return 0;
  }
};

module.exports = {getAllUsers, getUser, users, newUser}
