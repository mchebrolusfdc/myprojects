var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
let mongodb = require('./models/mongodb');
let app = express();
mongodb();

app.set('view engine', 'ejs');
app.use('/assets',express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret:'nbadhw4', resave: false, saveUninitialized: false})); //Session Initialization

var basic = require('./routes/basicConnections.js');
var connection = require('./routes/connectionController.js');
var profile = require('./routes/profileController.js');
var login = require('./routes/LoginController.js');
var error = require('./routes/errController.js');

//it handles home, about, contact pages
app.use('/',basic)
// it handles user profile related pages
app.use('/',profile)
// it handles connection related pages
app.use('/',connection)
// it handles login, logout pages
app.use('/',login)
// it handles error page
app.use('/',error);


app.listen(3000,function(){
  console.log('app started');
  console.log('listening on port 3000');

});
