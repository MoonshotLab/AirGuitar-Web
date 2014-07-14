var db = require('./db');
var sockets = require('./sockets');


exports.allAwesome = function(req, res){
  db.getAwesomes().then(function(awesomes){
    res.render('awesomes', { awesomes : awesomes });
  }).fail(function(e){
    res.send({ 'error': e });
  });
};


exports.findAwesome = function(req, res){
  db.getAwesome(req.params.shortCode).then(function(awesome){
    res.render('awesome', { awesome: awesome });
  }).fail(function(e){
    res.send({ 'error': e });
  });
};


exports.makeAwesome = function(req, res){
  var secret = req.body.secret;
  var shortCode = req.body.awesomeShortCode;

  if(secret == process.env.POST_HOOK_SECRET){
    db.getAwesome(shortCode).then(function(awesome){
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
