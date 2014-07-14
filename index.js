var path = require('path');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var routes = require('./lib/routes');
var sockets = require('./lib/sockets');

var app = express();
var server = http.Server(app);
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.allAwesome);
app.get('/awesomes', routes.allAwesome);
app.get('/awesome/:id', routes.findAwesome);
app.post('/awesome', routes.makeAwesome);

server.listen(port, function(){
  console.log('listening on *:3000');
});

sockets.connect(server);
