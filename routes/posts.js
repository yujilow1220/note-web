var express = require('express');
var router = express.Router();
var db = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  var start = req.body.start || 0;
  db.Post.find({}, null, {sort: {postedAt: -1}}, function(err, docs){
    res.send(docs);
  });
});

router.post('/', function(req, res, next){
  var post = new db.Post;
  post.text = req.body.text;

  if(req.body.tag){
      db.Tag.findOne({text:req.body.tag},{},{},function(err,docs){
        if(!docs){
          var tag = new db.Tag;
          tag.text = req.body.tag;
          tag.save(function(err,tag){
            post.tags.push(tag);
            post.save(function(err,data){
              console.log(data);
              res.send(data);
            })
          });
        }else{
          post.tags.push(docs);
          post.save(function(err,data){
            console.log(data);
            res.send(data);
          });
        }
      });
  }

  else {
    post.tags.push(db.root);
    post.save(function(err,data){
      console.log(data);
      res.send(data);
    });
  }
});

router.get('/test', function(req,res,next){
  // var post = new db.Post;
  // post.text = 'aaa';
  // post.save();
  db.Post.find({}, {}, function(err,doc){
      res.send(doc[doc.length-1].tags[0]);
  });

});

module.exports = router;
