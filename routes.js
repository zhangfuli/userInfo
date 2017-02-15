var crypto = require('cypto');
var express = require('express');
module.exports = function (app) {
	var users = require('.controllers/users_controllers');
	app.use('/static' , express.static('./static'))
			.use('/lib',express.static('../lib'));
};
app.get('/',function (req,res){
	
})