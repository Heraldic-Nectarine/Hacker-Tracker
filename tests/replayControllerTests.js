var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var Replay = require('../server/replay/replayModel.js'); 
var app = require('../server/server.js');

('wtf is this?', function() {

  // beforeEach(function(done) {
  //   // Log out currently signed in user
  //   request(app)
  //     .get('/logout')
  //     .end(function(err, res) {
  //       // Delete objects from db so they can be created later for the test
  //       Replay.remove({owner : 'SomeTestOwner'}).exec();
  //       done();
  //     });
  // });

  describe('Replay Creation: ', function() {

    it('It returns a newly created', function(done) {
      request(app)
        .post('/api/replays')
        .expect(404)
        .end(done);
    });

	});

});