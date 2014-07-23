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

app.get('/', routes.allAwesomes);
app.get('/mapper', routes.mapper);
app.get('/awesomes', routes.allAwesomes);
app.get('/awesome/:shortCode', routes.findAwesome);
app.post('/awesome', routes.makeAwesome);
app.get('/slowmos', routes.slowmos);
app.get('/slowmo/:shortCode', routes.findSlowmo);
app.post('/slowmo', routes.makeSlowmo);

server.listen(port, function(){
  console.log('server started, listening on port ' + port + '...');
});

sockets.connect(server);
