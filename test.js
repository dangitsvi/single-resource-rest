var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

describe('server test with a single rest resource', function() {
  it('should respond with a 404 when given a bad route', function(done) {
    chai.request('http://localhost:3000')
        .get('/blah')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          done();
        });
  });

  it('should respond to a get request', function(done) {
    chai.request('http://localhost:3000')
        .get('/games')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.text).to.eql(JSON.stringify({msg:'got /games/ route'}));
          done();
        });
  });

  it('should respond to a get request with an id', function(done) {
    chai.request('http://localhost:3000')
        .get('/games/1')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.text).to.eql(JSON.stringify({msg:'got /games/1 route'}));
          done();
        });
  });


   it('should respond to a post request', function(done) {
    chai.request('http://localhost:3000')
        .post('/games')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.text).to.eql(JSON.stringify({msg:'posted to /games/ route'}));
          done();
        });
  });

   it('should respond to a put request', function(done) {
    chai.request('http://localhost:3000')
        .put('/games/1')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.text).to.eql(JSON.stringify({msg:'updated /games/1 route'}));
          done();
        });
  });

  it('should respond to a delete request', function(done) {
    chai.request('http://localhost:3000')
        .delete('/games/1')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.text).to.eql(JSON.stringify({msg:'deleted /games/1 route'}));
          done();
        });
  });


});
