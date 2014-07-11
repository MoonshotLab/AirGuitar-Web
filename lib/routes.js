var db = require('./db');
var sockets = require('./sockets');


exports.allAwesome = function(req, res){
  db.getAwesomes().then(function(awesomes){
    res.render('awesomes', awesomes);
  });
};


exports.findAwesome = function(req, res){
  db.getAwesome(req.params.id).then(function(awesome){
    res.render('awesome', awesome);
  });
};


exports.makeAwesome = function(req, res){
  // ?

  sockets.broadcast({
    eventType: 'new-awesome',
    data: {}
  });
};
