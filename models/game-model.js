var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
  name: {type: String, unique: true},
  genre: String,
  rating: Number,
  key: {type: String, unique: true}
});

gameSchema.path("rating").validate(function(v) {
  return  v <= 10 && v > 0;
}, 'rate on a scale of 1 - 10');

module.exports = mongoose.model('Game', gameSchema);
