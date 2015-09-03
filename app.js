var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = module.exports = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

require('./infrastructure/server').startHttpServer(app);
require('./infrastructure/router').setUpControllers();
