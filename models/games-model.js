var Schema = mongoose.Schema
// var ObjectId = Schema.ObjectId;

var GamesRating = new Schema({
  // id: ObjectId,
  name: String,
  genre: String,
  rating: Number
});
