var io = null;

var connect = function(server){
  io = require('socket.io')(server);
  io.on('connection', function(socket){
    console.log('connected');
  });
};


var broadcast = function(eventType, data){
  io.sockets.emit(eventType, data);
};


exports.broadcast = broadcast;
exports.connect = connect;
