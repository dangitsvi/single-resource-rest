var express = require('express');
var router = express.Router();
var Game = require('./models/game-model.js');

router.get('/', function(req, res) {
  Game.find({}, function(err, docs) {
    if(err) {
      res.status(400);
      res.json({'msg': 'failed to retrieve file'});
    } else {
      res.json(docs);
    }
  });
});

router.get('/:key', function(req, res) {
  key = req.params.key;
  Game.findOne({key: key}, function(err, docs) {
    if(err) {
      res.status(400);
      res.json({'msg': 'failed to retrieve file'});
    } else {
      res.json(docs);
    }
  });
});

//superagent localHost:3000/games post '{"name": "MegaMan X", "genre": "platformer", "rating": 9}'

router.post('/', function(req, res) {

  var game = new Game(req.body);
  //This creates a lowercased, no space string based off of the name passed in. This key is used to access the files
  game.key = game.name.replace(/\s+/g, '').toLowerCase();
  game.save(function(err) {
    if (err) {
      res.status(400);
      res.json({'msg': 'failed to save post, try using a different name'});
    } else {
      res.json({'msg': 'posted to /games/ route', 'key': game.key});
    }
  });
});


router.put('/:key', function(req, res) {
  key = req.params.key;
  Game.update({key: key}, {$set: req.body}, function(err, docs) {
    if (err) {
      res.status(400);
      res.json({'msg': 'failed to update'});
    } else {
      res.json({'msg': 'update succeeded!'});
    }
  });
});

router['delete']('/:key', function(req, res) {
  key = req.params.key;
  Game.find({key: key}).remove().exec();
  res.json({'msg': 'deleted /games/' + key + ' route'});
});


module.exports = router;
