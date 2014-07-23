var Q = require('q');
var MongoClient = require('mongodb').MongoClient;

var collections = {};

MongoClient.connect(process.env.DB_CONNECT, function(err, db){
  if(err) console.log('error connecting to db...', err);
  else console.log('connected to db...');

  collections.slowmo = db.collection('slowmos');
  collections.awesome = db.collection('awesomes');
});


var getMany = function(type, limit){
  var deferred = Q.defer();
  if(!limit) limit = 50;

  collections[type].find().limit(limit).toArray(
    function(err, results){
      if(err) deferred.reject(results);
      else deferred.resolve(results);
    }
  );

  return deferred.promise;
};


var getOne = function(type, shortCode){
  var deferred = Q.defer();

  collections[type].findOne(
    { "shortCode" : shortCode },
    function(err, result){
      if(err) deferred.reject(results);
      else deferred.resolve(result);
    }
  );

  return deferred.promise;
};


exports.getMany = getMany;
exports.getOne = getOne;
