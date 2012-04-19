Find-up
=======

### Install

    npm install -g findup

### Usage

Find up a file in ancestor's dir


    .
    ├── config.json
    └── f
        └── e
            └── d
                └── c
                    ├── b
                    │   └── a
                    └── config.json

#### Async

    var findup = require('findup');

    // Usage: findup(dir, fileName, callback)
    // Or     findup(dir, iterator, callback) with `iterator(dir, cb)` where cb only accept `true` or `false`

    findup(__dirname + '/f/e/d/c/b/a', 'config.json', function(err, dir){
      // if(e) e === new Error('not found')
      // dir === '/f/e/d/c'
    });

or

    findup(__dirname + '/f/e/d/c/b/a', function(cb){
      require('path').exists('config.json', cb);
    }, function(err, dir){
      // if(e) e === new Error('not found')
      // dir === '/f/e/d/c'
    });


#### Sync

    var findup = require('findup');

    // Usage: findup(dir, fileName)
    // Or     findup(dir, iteratorSync) with `iteratorSync` return `true` or `false`

    try{
      var dir = findup.sync(__dirname + '/f/e/d/c/b/a', 'config.json'); // dir === '/f/e/d/c'
    }catch(e){
      // if(e) e === new Error('not found')
    }

#### CLI

    npm install -g findup

    $ cd test/fixture/f/e/d/c/b/a/
    $ findup package.json
    /root/findup/package.json

### LICENSE MIT

### Read the tests :)
