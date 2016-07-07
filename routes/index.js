var express = require('express');
var router = express.Router();
var db = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/store', function(req, res, next){
  var posts = req.body.posts;
  console.log(req.body);
  db.sync(posts, function(){
      res.send("ok");
  });
});

module.exports = router;
