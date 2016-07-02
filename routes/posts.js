var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:start', function(req, res, next){
  var count = req.params['count'];
  res.send(count);
});

module.exports = router;
