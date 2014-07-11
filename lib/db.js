var Q = require('q');


var getAwesomes = function(){
  var deferred = Q.defer();

  setTimeout(function(){
    deferred.resolve([]);
  }, 1000);

  return deferred.promise;
};


var getAwesome = function(){
  var deferred = Q.defer();

  setTimeout(function(){
    deferred.resolve({});
  }, 1000);

  return deferred.promise;
};


exports.getAwesomes = getAwesomes;
exports.getAwesome = getAwesome;
