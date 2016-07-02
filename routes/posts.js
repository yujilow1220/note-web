var express = require('express');
var router = express.Router();
var db = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next){
  var post = new db.Post;
  post.text = req.body.text;
  post.save(function(err,data){
    console.log(data);
    res.send(data);
  })
});

router.get('/test', function(req,res,next){
  // var post = new db.Post;
  // post.text = 'aaa';
  // post.save();
  db.Post.find({}, {}, function(err,doc){
      console.log(err);
      console.log(doc);
      res.send(doc);
  });
});

module.exports = router;
