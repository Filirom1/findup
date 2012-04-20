var fs = require('fs'),
  Path = require('path');

module.exports = function findup(dir, iterator, cb){
  if(typeof iterator === 'string'){
    var file = iterator;
    iterator = function(dir, cb){
      return Path.exists(Path.join(dir, file), cb);
    }
  }
  cb = cb || function(){};

  if (dir === '/') return cb(new Error('not found'));
  if(dir.indexOf('../../') !== -1 ) return cb(new Error(dir + ' is not correct.'));
  iterator(dir, function(exists){
    if(exists) return cb(null, dir);
    findup(Path.join(dir, '..'), iterator, cb);
  });
}

module.exports.sync = function(dir, iteratorSync){
  if(typeof iteratorSync === 'string'){
    var file = iteratorSync;
    iteratorSync = function(dir, cb){
      return Path.existsSync(Path.join(dir, file), cb);
    }
  }
  var initialDir = dir;
  while(dir !== '/'){
    if(dir.indexOf('../../') !== -1 ) throw new Error(initialDir + ' is not correct.');
    if(iteratorSync(dir)) return dir;
    dir = Path.join(dir, '..');
  }
  throw new Error('not found');
};
