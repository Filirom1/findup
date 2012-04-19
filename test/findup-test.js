var vows = require('vows'),
  assert = require('assert'),
  Path = require('path'),
  fs = require('fs'),
  findup = require('..');

vows.describe('Test find-up')
.addBatch({
  'Given a great file structure using a function': {
    topic: Path.join(__dirname, 'fixture', 'f', 'e', 'd', 'c', 'b', 'a'),
    
    'When findup a file in ancestors dir': {
      topic: function(fixtureDir){
        findup(fixtureDir, function(dir, cb){
          return Path.exists(Path.join(dir, 'config.json'), cb);
        }, this.callback);
      },

      'Then the dir containing the file is returned': function(err, file){
        assert.ifError(err);
        assert.equal(file, Path.join(__dirname, 'fixture', 'f', 'e', 'd', 'c'));
      }
    },

    'When findup a file in ancestors dir using a string': {
      topic: function(fixtureDir){
        findup(fixtureDir, 'config.json', this.callback);
      },

      'Then the dir containing the file is returned': function(err, file){
        assert.ifError(err);
        assert.equal(file, Path.join(__dirname, 'fixture', 'f', 'e', 'd', 'c'));
      }
    },

    'When findup a file in top dir': {
      topic: function(fixtureDir){
        findup(fixtureDir, 'top.json', this.callback);
      },

      'Then the dir containing the file is returned': function(err, file){
        assert.ifError(err);
        assert.equal(file, Path.join(__dirname, 'fixture', 'f', 'e', 'd', 'c', 'b', 'a'));
      }
    },

    'When findup a non existing file': {
      topic: function(fixtureDir){
        findup(fixtureDir, 'toto.json', this.callback);
      },

      'Then an error is returned': function(err, file){
        assert.isNotNull(err);
      }
    },

    'When findup a file in ancestors dir in synchronous mode': {
      topic: function(fixtureDir){
        return findup.sync(fixtureDir, 'config.json');
      },

      'Then the dir containing the file is returned': function(file){
        assert.equal(file, Path.join(__dirname, 'fixture', 'f', 'e', 'd', 'c'));
      }
    },

    'When findup a file in top dir in synchronous mode': {
      topic: function(fixtureDir){
        return findup.sync(fixtureDir, 'top.json');
      },

      'Then the dir containing the file is returned': function(file){
        assert.equal(file, Path.join(__dirname, 'fixture', 'f', 'e', 'd', 'c', 'b', 'a'));
      }
    },

    'When findup a non existing file in synchronous mode': {
      topic: function(fixtureDir){
        try{
          return findup.sync(fixtureDir, 'toto.json');
        }catch(e){
          return e;
        }
      },

      'Then an error is returned': function(err){
        assert.isNotNull(err);
      }
    }
  }
}).exportTo(module);
