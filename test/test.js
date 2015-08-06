var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var mongoose = require('mongoose');
var Game = require(__dirname + '/../models/game-model.js');

process.env.MONGOLAB_URL = 'mongodb://localhost/test';
require(__dirname + '/../server.js');
chai.use(chaiHttp);

describe('server test with a single rest resource', function() {
  //before all test, create dummy data in test server
  before(function(done) {
      var game = new Game({"name": "Dummy Name", "genre": "dumb", "rating": "3"});
      game.key = game.name.replace(/\s+/g, '').toLowerCase();
      game.save();
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
    it('should respond to a get request', function(done) {
      chai.request('http://localhost:3000')
        .get('/api/games')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should get an array of resources', function(done) {
      chai.request('http://localhost:3000')
        .get('/api/games')
        .end(function(err, res) {
            expect(res.body).to.be.an('array');
            expect(res.body[0].key).to.eql('dummyname');
            expect(res.body[0].name).to.eql('Dummy Name');
            done();
        });
    });

    it('should respond to a get request with an id', function(done) {
    chai.request('http://localhost:3000')
        .get('/api/games/dummyname')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should get single resource with an id', function(done) {
      chai.request('http://localhost:3000')
        .get('/api/games/dummyname')
        .end(function(err, res) {
            expect(res.body).to.be.an('object');
            expect(res.body.key).to.eql('dummyname');
            expect(res.body.name).to.eql('Dummy Name');
            done();
        });
    });
  });


  describe('post route', function() {
    it('should respond to a post request', function(done) {
    chai.request('http://localhost:3000')
        .post('/api/games')
        .send({"name": "Dummy Post", "genre": "post", "rating": "5"})
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

  /*  it('should post to the database', function(done) {
    chai.request('http://localhost:3000')
        .post('/api/games')
        .send({"name": "Dummy Post 2", "genre": "post", "rating": "10"})
        .end(function(err, res) {
          expect(res.body).to.eql({'msg': 'posted to /games/ route', 'key': "dummypost2", 'game':{"name": "Dummy Post 2", "genre": "post", "rating": "10"}});
          done();
        });
    });*/
  });

  describe('put route', function() {
    it('should respond to a put request', function(done) {
      chai.request('http://localhost:3000')
        .put('/api/games/dummyname')
        .send({"rating": "9"})
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should update the document', function(done) {
      chai.request('http://localhost:3000')
        .put('/api/games/dummyname')
        .send({"rating": "8"})
        .end(function(err, res) {
          expect(res.body).to.be.eql({"msg": "update succeeded!"});
          Game.findOne({key:"dummyname"}, function(err, data) {
            if (err) throw err;
            expect(data.rating).to.be.eql(8);
            done();
          });
        });
    });
  });

  describe('delete route', function() {
    beforeEach(function(done) {
      var game = new Game({"name": "Dummy Data delete", "genre": "dumb", "rating": "1"});
      game.key = game.name.replace(/\s+/g, '').toLowerCase();
      game.save();
      done();
    });

    it('should respond to a delete request', function(done) {
      chai.request('http://localhost:3000')
        .delete('/api/games/dummydatadelete')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
      });
    });

    it('should delete document', function(done) {
      chai.request('http://localhost:3000')
        .delete('/api/games/dummydatadelete')
        .end(function(err, res) {
          expect(res.body).to.eql({'msg': 'deleted /games/dummydatadelete route'});
          Game.findOne({key:"dummydatadelete"}, function(err, data) {
            if (err) throw err;
            expect(data).to.be.null;
            done();
          });
      });
    });
  });
});
