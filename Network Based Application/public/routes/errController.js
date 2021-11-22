var express = require('express');
var router = express.Router();


router.get('/error',function(req, res){
   // it renders error page
  res.render('error', {log: req.session.theUser});
})

 // it redirect to error page if an invalid url is given
.get('/*', function(req, res){
  res.redirect('error');
});

module.exports = router;
