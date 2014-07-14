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


exports.allAwesomes = function(req, res){
  db.getMany('awesome').then(function(awesomes){
    res.render('awesomes', { awesomes : awesomes });
  }).fail(function(e){
    res.send({ 'error': e });
  });
};


exports.findAwesome = function(req, res){
  db.getOne('awesome', req.params.shortCode).then(function(awesome){
    res.render('awesome', { awesome: awesome });
  }).fail(function(e){
    res.send({ 'error': e });
  });
};


exports.makeAwesome = function(req, res){
  if(verifySecret(req.body)){
    db.getOne('awesome', req.body.shortCode).then(function(awesome){
      sockets.broadcast({
        eventType: 'new-awesome',
        data: awesome
      });
    });

    res.send({ success: true });
  } else{
    res.send({ error: 'bad secret' });
  }
};


exports.allSlowmos = function(req, res){
  db.getMany('slowmo').then(function(slowmos){
    res.render('slowmos', { slowmos : slowmos });
  }).fail(function(e){
    res.send({ 'error': e });
  });
};


exports.findSlowmo = function(req, res){
  db.getOne('slowmo', req.params.shortCode).then(function(slowmo){
    res.render('slowmo', { slowmo: slowmo });
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
