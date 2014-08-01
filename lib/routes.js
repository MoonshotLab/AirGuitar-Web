var Q = require('q');
var db = require('./db');
var sockets = require('./sockets');


var verifySecret = function(requestBody){
  if(requestBody && requestBody.secret && requestBody.shortCode){
    if(requestBody.secret == process.env.POST_HOOK_SECRET)
      return true;
    else
      return false;
  } else return false;
};


exports.rockWall = function(req, res){
  var limit = parseInt(req.query.limit) || 50;
  var offset = parseInt(req.query.offset) || 0;

  db.getMany('slowmo', limit).then(function(slowmos){
    res.render('rock-wall', { slowmos : slowmos });
  }).fail(function(e){
    res.send({ 'error': e });
  });
};


exports.slowmos = function(req, res){
  var limit = parseInt(req.query.limit) || 6;
  var offset = parseInt(req.query.offset) || 0;

  db.getMany('slowmo', limit, offset).then(function(slowmos){
    res.render('slowmos', {
      slowmos : slowmos,
      limit : limit,
      offset : offset
    });
  }).fail(function(e){
    res.send({ 'error': e });
  });
};


exports.findSlowmo = function(req, res){
  db.getOne('slowmo', req.params.shortCode).then(function(slowmo){
    if(slowmo)
      res.render('slowmo', { slowmo: slowmo });
    else
      res.send({'whoops' : 'I don\'t know have that slowmo on file'});
  }).fail(function(e){
    res.send({ 'error': e });
  });
};


exports.makeSlowmo = function(req, res){
  if(verifySecret(req.body)){
    db.getOne('slowmo', req.body.shortCode).then(function(slowmo){
      sockets.broadcast({
        eventType: 'new-slowmo',
        data: slowmo
      });
    });

    res.send({ success: true });
  } else{
    res.send({ error: 'bad secret' });
  }
};
