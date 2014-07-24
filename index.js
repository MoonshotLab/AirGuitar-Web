var path = require('path');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var routes = require('./lib/routes');
var sockets = require('./lib/sockets');
var env = process.env.MODE;
var livereload = null;

var app = express();
var server = http.Server(app);
var port = process.env.PORT || 3000;

if(env != 'production'){
  livereload = require('express-livereload');
  livereload(app, {watchDir : process.cwd() + '/public'});
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.mapper);
app.get('/mapper', routes.mapper);
app.get('/slowmos', routes.slowmos);
app.get('/slowmo/:shortCode', routes.findSlowmo);
app.post('/slowmo', routes.makeSlowmo);

server.listen(port, function(){
  console.log('server started, listening on port ' + port + '...');
});

sockets.connect(server);
