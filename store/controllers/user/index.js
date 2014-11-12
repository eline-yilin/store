'use strict';

module.exports = function(router) {

	router.get('/', function(req, res) {
		var uid = req.cookies && req.cookies.uid;
		var UserModel = require('../../models/user');
		var model = new UserModel();
		model.id(uid,function(err, rst) {
			if (err) {
				console.log(err);
			} else {
				res.format({
					json : function() {
						res.json(rst);
					},
					html : function() {
						res.render('user/index', {
							user : rst,
							name : 'user'
						});
					}
				});
			}
		});

	});

	router.get('/logout', function(req, res) {
		res.clearCookie('uid');
		res.clearCookie('username');
		res.locals.userObj = null;
		res.redirect('/');

	});
	
	router.get('/credit', function(req, res) {
		var uid = req.cookies && req.cookies.uid;
		var CreditModel = require('../../models/credit');
		var model = new CreditModel();
		model.get({userid:uid},function(err, rst) {
			if (err) {
				console.log(err);
			} else {
				res.format({
					json : function() {
						res.json(rst);
					},
					html : function() {
						var date =  new Date(rst.expiration);
						console.log(rst.expiration);
						console.log(date);
						rst.expiration = (date.getMonth() + 1) + '-' + date.getDay() + '-' +  date.getFullYear();
						console.log(rst.expiration);
						res.render('user/credit', {
							credits : rst,
							name : 'user'
						});
					}
				});
			}
		});

	});

	router.get('/order', function(req, res) {
		var uid = req.cookies && req.cookies.uid;
		var ProductModel = require('../../models/product');
		var model = new ProductModel();
		model.get({userid:uid},function(err, rst) {
			if (err) {
				console.log(err);
			} else {
				res.format({
					json : function() {
						res.json(rst);
					},
					html : function() {
						res.render('user/order', {
							credits : rst,
							name : 'user'
						});
					}
				});
			}
		});

	});
	router.get('/login', function(req, res) {
		var phone = null ;
		if(req.user){
		   phone = req.user.phone ;
		}
		
		res.render('user/login', {
				user : {phone:phone},
				name : 'user'
		});
		
		});
	
	router.post('/login', function(req, res) {
		var UserModel = require('../../models/user');
		var model = new UserModel();
		var phone = req.body.phone;
		var password = req.body.password;
		console.log(phone + '/' + password);
		model.get({phone:phone,password:password}, function(err, rst) {
			if (err) {
				console.log(err);
			} else {
				
				console.log(rst);
					if(rst && rst[0])
					{
						rst = rst[0];
						res.cookie('uid',rst.id);
						res.cookie('username',rst.name);
					}
					
					res.json(rst);				
			}
		});

	});
	
	router.get('/register', function(req, res) {
		var openid = req.cookies.openid;
		if (!openid ||openid == 'undefined') {
			console.log('no openid');
			res.redirect('/errors/404');
		} else {
			console.log(openid + '////');
			res.cookie('openid', openid);

			var years = new Array();
			var months = new Array();
			var days = new Array();
			for ( var i = 1970; i < 2014; i++) {
				years.push({
					value : i,
					key : i
				});
			}
			for ( var i = 1; i < 13; i++) {
				months.push({
					value : i,
					key : i
				});
			}
			for ( var i = 1; i < 32; i++) {
				days.push({
					value : i,
					key : i
				});
			}
			var rst = {
				years : years,
				months : months,
				days : days
			};
			res.format({
				json : function() {
					res.json(rst);
				},
				html : function() {
					res.render('user/register', {
						data : rst,
						name : 'user'
					});
				}
			});
		}
	});

	router.post('/register', function(req, res) {
		var UserModel = require('../../models/user');
		var model = new UserModel();
		var openid = req.query.openid || (req.cookies && req.cookies.openid);
		var body = {
				openid:openid,
				name:req.body.username,
				phone:req.body.phone,
				gender:req.body.gender,
				password:req.body.password,
				birthday: req.body.year + '-' + req.body.month +  '-' +  req.body.day,
				clientid:0
		}

		model.post(body, function(err, rst) {
			if (err) {
				console.log(err);
			} else {
				res.cookie('uid', rst.insertId);
				res.cookie('username',req.body.username);
				if(!res.locals.userObj)
				{
					res.locals.userObj = {};

				}
				res.locals.userObj.username = req.body.username;
				res.redirect('/');
			}
		});

	});

};
