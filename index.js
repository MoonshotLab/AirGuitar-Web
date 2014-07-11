var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var routes = require('./lib/routes');
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.home);
app.get('/awesomes', routes.allAwesome);
app.get('/awesome/:id', routes.findAwesome);
app.post('/awesome', routes.makeAwesome);

io.on('connection', function(socket){
  console.log('connected');
});

http.listen(port, function(){
  console.log('listening on *:3000');
});
