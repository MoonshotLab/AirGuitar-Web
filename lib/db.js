var Q = require('q');
var MongoClient = require('mongodb').MongoClient;


var awesomes = null;
MongoClient.connect(process.env.DB_CONNECT, function(err, db){
  if(err) console.log('error connecting to db...', err);
  else console.log('connected to db...');

  awesomes = db.collection('awesomes');
});


var getAwesomes = function(){
  var deferred = Q.defer();

  awesomes.find().limit(50).toArray(
    function(err, results){
      if(err) deferred.reject(results);
      else deferred.resolve(results);
    }
  );

  return deferred.promise;
};


var getAwesome = function(shortCode){
  var deferred = Q.defer();

  awesomes.findOne(
    { "shortCode" : shortCode },
    function(err, result){
      if(err) deferred.reject(results);
      else deferred.resolve(result);
    }
  );

  return deferred.promise;
};


exports.getAwesomes = getAwesomes;
exports.getAwesome = getAwesome;
