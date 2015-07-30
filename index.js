var shisha  = require('shisha');
var Promise = require('bluebird');
var path    = require('path');
var _       = require('lodash');
var sleep   = require('sleep').sleep;

/**
 * Returns a list of (smokable)
 * resources from the given directory.
 */
function getResources(dir, config) {
  var finder    = require('findit')(dir);
  var resources = {};

  finder.on('file', function(file, stat) {
    var url = config.baseUrl + path.relative(dir, file);
    resources[url] = 200;
  });

  return new Promise(function(resolve){
    finder.on('end', function() {
        resolve(resources)
    });
  });
}

/**
 * Smokes the given resources.
 */
function smoke(resources, currentTry, config) {
  shisha.smoke(resources, function(report){
    var failedResources = _.filter(report, function(resource){
      return !(resource.result);
    })

    if (Object.keys(failedResources).length) {
      setTimeout(function(){
        retry(failedResources, currentTry, config);
      }, config.sleep * 1000)
    } else {
      console.log("All resources are on the CDN");
    }
  });
}

/**
 * Gets a list of resource that weren't
 * available on the CDN and tries to smoke
 * them again.
 *
 * This process will be repeated as many times
 * as it's defined in config.tries or --tries from
 * the command line.
 *
 * If the resources, after the Nth try, are still
 * unavailable, the process exists with a non-zero
 * status code (exception).
 */
function retry(failedResources, currentTry, config){
  console.log("Attempting to verify everything is on the CDN (" + currentTry + ")");

  if (currentTry === config.tries) {
    fail(failedResources);
  } else {
    currentTry += 1;
    smoke(failedResources, currentTry, config);
  }
}

/**
 * What a disappointment.
 */
function fail(failedResources) {
  var message = "Some resources weren't found on the CDN";

  _.each(failedResources, function(resource){
    message += "\n" + resource.url;
  })

  var error = new Error(message);
  error.resources = failedResources;

  throw error;
}

/**
 * Runs the CDN checks.
 *
 * Be sure all resources are uploaded
 * on the CDN, else this guy is gonna
 * get mad.
 */
function run(dir, config) {
  var currentTry = 1;

  getResources(dir, config).then(function(resources){
    smoke(resources, currentTry, config);
  }).done()
}

module.exports = run;
