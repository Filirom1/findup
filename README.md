findup
===

[![npm version](https://img.shields.io/npm/v/findup.svg)](https://npmjs.com/package/findup)
[![javascript standard style](https://img.shields.io/badge/code%20style-standard-blue.svg)](http://standardjs.com/)
[![travis build](https://img.shields.io/travis/Filirom1/findup/master.svg)](https://travis-ci.org/Filirom1/findup)
[![coveralls coverage](https://img.shields.io/coveralls/Filirom1/findup.svg)](https://coveralls.io/github/Filirom1/findup)
[![david dependencies](https://david-dm.org/Filirom1/findup.svg)](https://david-dm.org/Filirom1/findup)
[![david dev dependencies](https://david-dm.org/Filirom1/findup/dev-status.svg)](https://david-dm.org/Filirom1/findup)
[![greenkeeper badge](https://badges.greenkeeper.io/Filirom1/findup.svg)](https://greenkeeper.io/)

`npm install findup`

Find up a file in ancestor's dir

- [usage](#usage)
- [api](#api)

usage
---

```js
/*

  Assuming file structure:

  /
  ├── findup.js
  ├── config.json
  └── f
      └── e
          └── d
              └── c
                  ├── b
                  │   └── a
                  └── config.json
 */

// findup.js

import findup from 'findup'
import assert from 'assert'

const aDir = '/f/e/d/c/b/a'

// Pass a string to look for nearest directory that has the file
findup(aDir, 'config.json', (err, dir) => {
  if (err) return console.log(err)
  assert(dir, '/f/e/d/c')
})


// Pass a function to iterate through directories
findup(aDir, (dir, callback) => {
  const dirEndsWithD = /d$/.test(dir)
  // Call back with a truthy value to abort search
  callback(null, dirEndsWithD)
}, (err, dir) => {
  if (err) return console.log(err)
  assert(dir, '/f/e/d')
})

// Pass options
findup(aDir, 'config.json', {maxdepth: 1}, (err, dir) =>[
  assert(err.message, 'Not found')
])
```

api
---




### Options

- `maxdepth`: (Number, default -1) How far to traverse before giving up. If maxdepth is `-1`, then there is no limit.


#### EventEmitter

findup(dir, fileName, options)

```js
var findup = require('findup');
var fup = findup(__dirname + '/f/e/d/c/b/a', 'config.json');
```

findup(dir, iterator, options) with `iterator(dir, cb)` where cb only accept `true` or `false`

```js
var findup = require('findup');
var fup = findup(__dirname + '/f/e/d/c/b/a', function(dir, cb){
  require('path').exists(dir + '/config.json', cb);
});
```

findup return an EventEmitter. 3 events are emitted: `found`, `error`, `end`

`found` event is emitted each time a file is found.

You can stop the traversing by calling `stop` manually.

```js
fup.on('found', function(dir){
  // dir === '/f/e/d/c'
  fup.stop();
});
```

`error` event is emitted when error happens

```js
fup.on('error', function(e){
  // if(e) e === new Error('not found')
});
```

`end` event is emitted at the end of the traversing or after `stop()` is
called.

```js
fup.on('end', function(){
  // happy end
});
```

#### Sync

findup(dir, fileName)
findup(dir, iteratorSync) with `iteratorSync` return `true` or `false`
```js
var findup = require('findup');

try{
  var dir = findup.sync(__dirname + '/f/e/d/c/b/a', 'config.json'); // dir === '/f/e/d/c'
}catch(e){
  // if(e) e === new Error('not found')
}
```

#### CLI
```js
npm install -g findup

$ cd test/fixture/f/e/d/c/b/a/
$ findup package.json
/root/findup/package.json
```

Usage

```
$ findup -h

Usage: findup [FILE]

    --name, -n       The name of the file to found
    --dir, -d        The directoy where we will start walking up    $PWD
    --help, -h       show usage                                     false
    --verbose, -v    print log                                      false
```

### LICENSE MIT

### Read the tests :)
