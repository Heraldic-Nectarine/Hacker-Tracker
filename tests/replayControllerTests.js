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
      console.log("Successfully Cleared the DB")
    })

    new Replay({owner:"TestOwner",title:"TestTitle",path:[{lat:123,lng:312},{lat:123,lng:312},{lat:123,lng:312}]}).save(function(err,success){
      if(err){
        return console.log("There was an error in the beforeEach stuff");
      }
      console.log("Sucessfully made a seed obj in the db");
    });

    done();

  });

  describe('Replay Creation: ', function() {

    it('It returns a newly created replay', function(done) {
    	var replay = {owner:"SomeTestOwner",}
      request(app)
      .get('/api/replays')
      .expect(200)
      .end(function(err,resp){
        if(err){
          return console.log(err)
        }
          expect(resp.body[0].owner).to.equal("TestOwner");
          done();
      });
    });

    it('It creates a new replay and makes it available by `owner` ', function(done) {
      var replay = {owner:"SomeNewOwner",title:"TESTITLE",path:[{lat:9999,lng:8888},{lat:9999,lng:8888}]}
      request(app)
      .post('/api/replays')
      .send(replay)
      .expect(200)
      .end(function(err,resp){
        if(err){
          return console.log(err)
        }
        expect(resp.body.owner).to.equal("SomeNewOwner");
      });

      request(app)
      .get('/api/replays/SomeNewOwner/TESTITLE')
      .send(replay)
      .expect(200)
      .end(function(err,resp){
        if(err){
          return console.log(err)
        }
        expect(resp.body.owner).to.equal("SomeNewOwner");
      });
      done();
    });

    it('It should update a replay\'s title ', function(done) {
      var replay = {newTitle:"THENEWESTTITLE"}
      request(app)
      .put('/api/replays/SomeNewOwner/TestTitle')
      .send(replay)
      .expect(200)
      .end(function(err,resp){
        if(err){
          return console.log(err)
        }
        expect(resp.body.owner).to.equal("SomeNewOwner");
        done();
      });
    });


	});
