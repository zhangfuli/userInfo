var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session : expressSession});
var mongoose = require('mongoose');
require('./models/users_model.js');

var conn = mongoose.connect('mongodb://localhost:27017/myapp');
var app = express();

app.engine('.html',require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine','html');
app.use(bodyParser());
app.use(cookieParser());

//向数据库中储存
app.use(expressSession({
	secret : 'SEECRET',
	cookie : {maxAge : 60*60*1000},
	store : new mongoStore({
		url: "mongodb://localhost:27017/myapp" 
	})
}));
require('./routes')(app);
app.listen(80);
