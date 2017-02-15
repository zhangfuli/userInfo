var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session : expressSession});
var mongoose = require('mongoose');
require('./models/users_model.js');

var conn = mongoose.connect('mongodb://localhost/myapp');
var app = express();

app.engine('.html',require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine','html');
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({
	secret : 'SEECRET',
	cookie : {maxAge : 60*60*1000},
	store : new mongoStore({
		db : mongoose.connect.db,
		collection : 'sessions'
	})
}));
require('./routes')(app);
app.listen(80);
