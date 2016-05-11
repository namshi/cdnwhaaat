#!/usr/bin/env node
/**
 * cdnwhaaat /tmp/cdn --cdn=https://a.namshicdn.com/ [--sleep 1] [--tries 1]
 */
var argv  = require('yargs').argv;
var run   = require('../index.js');
var dir = argv._[0];
var cdn = argv.cdn;

if (!dir) {
  console.log("You must pass a path to your local files (ie. cdnwhaaat /tmp/upload --cdn http://cdn.example.com/uploads/)");
  process.exit(1);
}

if (!cdn) {
  console.log("You must pass a cdn URL (ie. cdnwhaaat /tmp/upload --cdn http://cdn.example.com/uploads/)");
  process.exit(1);
}

run(dir, {
  baseUrl: cdn,
  tries: argv.tries || 5,
  sleep: argv.sleep || 3
});  
