var mongoose = require('mongoose');

var db =  function(){
  //connecting to database Sports1
  mongoose.connect('mongodb://localhost/Sports1', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(
    console.log("connected to database")
  )
  .catch(
    error => handleError(error)
  );
}
module.exports = db;
