#!/usr/bin/env node

var findup = require('..'),
  Path = require('path');

if(process.argv.length < 3) {
  console.error('Usage: findup [FILE]');
  process.exit(-1);
}

var file = process.argv[2];
findup(process.cwd(), file, function(err, dir){
  if(err) return console.error(err.message ? err.message : err);
  console.log(Path.join(dir, file))
});
