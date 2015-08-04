var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var gamesRoute = require('./router/router.js');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/build'));

app.use(bodyParser.json());
app.use('/games', gamesRoute);

mongoose.connect(process.env.MONGOLAB_URL || 'mongodb://localhost/games');



// app.all('*', function(req, res) {
//   res.status(404);
//   res.json({'msg': 'Error: 404 file not found'});
// });

app.listen(port, function() {
  console.log('server is listening at: ' + port);
});
