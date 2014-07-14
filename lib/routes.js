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


exports.allAwesome = function(req, res){
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
