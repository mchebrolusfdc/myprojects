//userConnection object
var userConnection = function (Connection, rsvp) {
  var userConnectionModel = {
    connection:Connection,
    rsvp: rsvp
  };
  return userConnectionModel;
};

module.exports = userConnection;
