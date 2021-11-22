//connection model
var connection = function (value) {
  var connectModel = {
    connectionId: value._id,
    connectionName:value.Name,
    connectionTopic:value.Topic,
    connectionDate:value.Date,
    connectionTime:value.Time,
    connectionAddress:value.Address,
    connectionImage:value.Image,
    connectionHostedBy:value.HostedBy,
    connectionCreatedBy:value.CreatedBy,
    connectionGoing: value.Going,
    connectionDescription:value.Description
  };
  return connectModel;
};

module.exports.connection = connection;
