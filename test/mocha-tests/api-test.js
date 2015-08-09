var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var mongoose = require('mongoose');
var Game = require(__dirname + '/../../models/game-model.js');

process.env.MONGOLAB_URL = 'mongodb://localhost/test';
require(__dirname + '/../../server.js');
chai.use(chaiHttp);

var id;
var deleteGameId;

describe('server test with a single rest resource', function() {
  //before all test, create dummy data in test server
  before(function(done) {
      var game = new Game({"name": "Dummy Name", "genre": "dumb", "rating": "3"});
      game.save();
      id = game._id;
      done();
  });

  //clear test server after all tests
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should respond with a 404 when given a bad route', function(done) {
    chai.request('http://localhost:3000')
        .get('/blah')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          done();
        });
  });

  describe('get request', function() {
    it('should respond to a get all request', function(done) {
      chai.request('http://localhost:3000')
        .get('/api/games')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.eql('Dummy Name');
          done();
        });
    });

    it('should respond to a get request with an id', function(done) {
    chai.request('http://localhost:3000')
        .get('/api/games/' + id)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.eql('Dummy Name');
          done();
        });
    });
  });

  describe('post route', function() {
    it('should respond to a post request', function(done) {
    chai.request('http://localhost:3000')
        .post('/api/games')
        .send({"name": "New Dummy", "genre": "post", "rating": "5"})
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('put route', function() {
    it('should respond to a put request', function(done) {
      chai.request('http://localhost:3000')
        .put('/api/games/' + id)
        .send({"rating": "9"})
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.eql({"msg": "update succeeded!"});
          Game.findById(id, function(err, data) {
            if (err) throw err;
            expect(data.rating).to.be.eql(9);
            done();
          });
        });
    });
  });

  describe('delete route', function() {
    beforeEach(function(done) {
      var game = new Game({"name": "Dummy Data delete", "genre": "dumb", "rating": "1"});
      game.save();
      deleteGameId = game._id;
      done();
    });

    it('should respond to a delete request', function(done) {
      chai.request('http://localhost:3000')
        .delete('/api/games/' + deleteGameId)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          Game.findOne({key:"dummydatadelete"}, function(err, data) {
            if (err) throw err;
            expect(data).to.be.null;
            done();
          });
      });
    });
  });
});
