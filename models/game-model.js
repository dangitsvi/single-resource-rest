var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
  name: {type: String, unique: true},
  genre: String,
  rating: Number,
  key: {type: String, unique: true}
});

module.exports = mongoose.model('Game', gameSchema);
