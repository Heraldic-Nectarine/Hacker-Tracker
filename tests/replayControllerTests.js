var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var Replay = require('../server/replay/replayModel.js'); 
var app = require('../server/server.js');



  beforeEach(function(done) {

    Replay.remove({},function(err,success){

      if(err){
        console.log("ERROR",err)
      }
      console.log("Sucess")

    })
    new Replay({owner:"TESTOWNER",title:"TEST TITLE",path:[{lat:"testLAT",lng:"TESTlng"}]});
    // request(app)
    //   .get('/logout')
    //   .end(function(err, res) {
    //     // Delete objects from db so they can be created later for the test
    //     Replay.remove({owner : 'SomeTestOwner'}).exec();
    //     done();
    //   });
  });

  describe('Replay Creation: ', function() {

    it('It returns a newly created replay', function() {
    	// var replay = {owner:"SomeTestOwner",}
      request(app)
        .get('/api/replays')
        .expect(200)
        .end(function(err,resp){

          if(err){
            console.log(err)
          }
          console.log(resp)



        });
    });

	});
