var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res) {
  //grab resource from mongo
  res.json({'msg':'got /games/ route'});
});

router.get('/:id', function(req, res) {
  id = req.params.id;
  res.json({'msg': 'got /games/' + id + ' route'});
});

router.post('/', function(req, res) {
  res.json({'msg': 'posted to /games/ route'});
});


router.put('/:id', function(req, res) {
  id = req.params.id;
  res.json({'msg': 'updated /games/' + id + ' route'});
});

router['delete']('/:id', function(req, res) {
  id = req.params.id;
  res.json({'msg': 'deleted /games/' + id + ' route'});
});




module.exports = router;
