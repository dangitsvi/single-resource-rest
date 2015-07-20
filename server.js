var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var gamesRoute = require('./router');


app.use('/games', gamesRoute);

app.all('*', function(req, res) {
  res.status(404);
  res.json({'msg': 'Error: 404 file not found'});
});

app.listen(3000, function() {
  console.log('server is listening');
});
