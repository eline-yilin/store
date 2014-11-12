'use strict';


var UserModel = require('../../../models/user');


module.exports = function (router) {

    var model = new UserModel();


    router.get('/', function (req, res) {

    	var model = new UserModel();
    	model.get({},function(err,rst){
    		res.render('admin/user/index', {items:rst,name:'user'});
    	});
    
    });

};
