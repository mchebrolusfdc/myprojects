//user object
var user = function (value) {
  var userModel = {
    userid:value._id,
    firstName: value.firstName,
    lastName: value.lastName,
    email:value.email,
    address: value.address,
    city: value.city,
    state: value.state,
    zipcode:value.zipcode,
    country: value.country,
    savedconnections: value.savedconnections
  };
  return userModel;
};

module.exports.user = user;
