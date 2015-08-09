var express = require('express');
var router = express.Router();
var Game = require('../models/game-model.js');

router.get('/games', function(req, res) {
  Game.find({}, function(err, docs) {
    if(err) {
      res.status(400);
      res.json({'msg': 'failed to retrieve file'});
    } else {
      res.json(docs);
    }
  });
});

router.get('/games/:id', function(req, res) {
  id = req.params.id;
  Game.findById(id, function(err, doc) {
    if(err) {
      res.status(400);
      res.json({'msg': 'failed to retrieve file'});
    } else {
      res.json(doc);
    }
  });
});


router.post('/games', function(req, res) {

  var game = new Game(req.body);
  console.log(req.body);
  //This creates a lowercased, no space string based off of the name passed in. This key is used to access the files
  // game.key = game.name.replace(/\s+/g, '').toLowerCase();
  game.save(function(err) {
    if (err) {
      res.status(400);
      res.json({'msg': 'failed to save post, try using a different name'});
    } else {
      res.json({'msg': 'posted to /games/ route', 'game': game});
    }
  });
});


router.put('/games/:id', function(req, res) {
  id = req.params.id;
  Game.findByIdAndUpdate(id, {$set: req.body}, function(err, doc) {
    if (err) {
      res.status(400);
      res.json({'msg': 'failed to update'});
    } else {
      res.json({'msg': 'update succeeded!'});
    }
  });
});

router['delete']('/games/:id', function(req, res) {
  id = req.params.id;
  Game.findByIdAndRemove(id, function(err, doc) {
    if (err) {
      res.status(400);
      res.json({'msg': 'failed to delete'});
    } else {
      res.json({'msg': 'deleted game'});
    }
  });
});


module.exports = router;
