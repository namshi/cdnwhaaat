var path = require('path');
var expect = require('chai').expect;
var nock = require('nock');
var cdnwhaaat = require('./../index.js');

describe('RetryTest', function() {
  it('should return an error if more then X try are failing', function(done) {
    var cdn = 'http://a.namshicdn.com/';
    nock(cdn)
      .get('/test.js')
      .reply(404);
    nock(cdn)
      .get('/test.js')
      .reply(404);

      cdnwhaaat(path.join(__dirname, 'fixtures'), {
        baseUrl: cdn,
        tries: 2,
        sleep: 1
      }, function(err) {
        expect(err.message).to.equal('Some resources weren\'t found on the CDN\nhttp://a.namshicdn.com/test.js');
        done();
      });
  })
})
