'use strict';
module.exports = function() {
	return function(req, res, next) {
		var url = req.url;
		var openid = req.query.openid || (req.cookies && req.cookies.openid);
		if(openid){
			res.cookie('openid',openid);
		}
		var uid = req.cookies && req.cookies.uid;
		var method = req.method;
		if(!res.locals.userObj)
		{
			res.locals.userObj = {};
			if(req.cookies.username){
				res.locals.userObj.username = req.cookies.username;
			}
		}
		console.log(res.locals.userObj);
		// not in error page
		if (url.indexOf('errors/') < 0) {
				// in register
				if (method.toLowerCase() == 'get'
						&& url.indexOf('user/register') >= 0) {
					//no open id, can't register, go to error
					if(!openid){
						console.log('in auth//');
						res.redirect('/errors/404');
					}
					//check exsiting account against openid
					else {
						var UserModel = require('../models/user');
						var model = new UserModel();
						model.openid(openid,
								function(err, rst) {
							if (err) {
								console.log(err);
							} else {
								res.format({
									json : function() {
										console
										.log('json:'+ JSON.stringify(rst));
										next();
									},
									html : function() {
										//user exsits, go to home
										if (rst) {
											uid = rst['id'];
											res.cookie('uid',uid);
											res.cookie('username',rst.name);
											res.redirect('/');
											console.log('////' + JSON.stringify(rst));
										} else {
											next();
										}

									}
								});
							}
						});
					} 
				}
				//login page
				else if (method.toLowerCase() == 'get'
					&& url.indexOf('user/login') >= 0) {
				//no open id, proceed to login
				if(!openid){
					next();
				}
				//check exsiting account against openid
				else {
					var UserModel = require('../models/user');
					var model = new UserModel();
					model.openid(openid,
							function(err, rst) {
						if (err) {
							console.log(err);
						} else {
							res.format({
								json : function() {
									console
									.log('json:'+ JSON.stringify(rst));
									next();
								},
								html : function() {
									//user exsits, set phone
									if (rst) {
										var uid = rst['id'];
										var phone = rst['phone'];
										var password = rst['password'];
										req.user = {};
										req.user.phone = phone;
										console.log('////' + JSON.stringify(rst));
										next();
									} else {
										next();
									}

								}
							});
						}
					});
				} 
			}
				//admin pages
				else if (method.toLowerCase() == 'get'
					&& url.indexOf('/admin') >= 0) {
				//no open id, proceed to login
				if(!uid){
					res.redirect('/user/login');
				}
				//check exsiting account against openid
				else {
					var UserModel = require('../models/user');
					var model = new UserModel();
					model.isAdmin({uid:uid},
							function(err, rst) {
						if (err) {
							console.log(err);
						} else {
							res.format({
								json : function() {
									console
									.log('json:'+ JSON.stringify(rst));
									next();
								},
								html : function() {
									//user exsits, set phone
									if (rst) {
										console.log('////' + JSON.stringify(rst));
										next();
									} else {
										res.redirect('/');
									}

								}
							});
						}
					});
				} 
			}
				// in other pages
				else {
					console.log('in auth//' + openid);
					//no id, no page
					if (!uid && method.toLowerCase() == 'get' ) {
						//res.redirect('/user/login');
						next();
					} else {
						next();
					}
				}
			
		} else {
			next();
		}

	};
};