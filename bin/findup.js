#!/usr/bin/env node

var findup = require('..'),
  Path = require('path'),
  nopt = require('nopt'),
  knownOpts = {
    name      : String,
    dir       : Path,
    help      : Boolean,
    verbose   : Boolean
  },
  description = {
    name      : "The name of the file to found",
    dir       : "The directoy where we will start walking up",
    help      : "show usage",
    verbose   : "print log"

  },
  defaults = {
    dir       : process.cwd(),
    help      : false,
    verbose   : false
  },
  shortHands = {
    d  : "--dir",
    n  : "--name",
    h  : "--help",
    v  : "--verbose"
  },
  options = nopt(knownOpts, shortHands, process.argv, 2),
  argvRemain = options.argv.remain;

// defaults value
Object.keys(defaults).forEach(function(key){
  var value = defaults[key];
  options[key] = options[key] || value;
});

if(argvRemain && argvRemain.length >=1 ) options.name = argvRemain[0];

if(!options.name || options.help) {
  console.error('Usage: findup [FILE]');
  console.error('');
  console.error(nopt.usage(knownOpts, shortHands, description, defaults));
  process.exit(-1);
}

var file = options.name;
findup(process.cwd(), file, options, function(err, dir){
  if(err) return console.error(err.message ? err.message : err);
  console.log(Path.join(dir, file));
});
