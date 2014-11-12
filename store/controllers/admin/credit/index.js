'use strict';


var CreditModel = require('../../../models/credit');


module.exports = function (router) {
    router.get('/', function (req, res) {
    	var model = new CreditModel();
    	model.get({},function(err,rst){
    		res.render('admin/credit/index', {items:rst,name:'credit'});
    	});
    });
    
    router.get('/add', function (req, res) {
    	res.render('admin/credit/add', {items:{},name:'news'});
    	
        });
    
    router.post('/add', function (req, res) {
    	var model = new CreditModel();
    	var uid = req.cookies && req.cookies.uid;
		var reqBody=
			{
				expiration: req.body.expiration,
				amount:req.body.amount,
				typeid:req.body.typeid,
				userid:uid
			}
    	model.post
    	(reqBody,
    		function (err, rst) {
			if (err) {
				console.log(err);
			}
			else{
		        res.format({
		            json: function () {
		                res.json(rst);
		            },
		            html: function () {
						console.log('////' + JSON.stringify(rst));
		                res.redirect('/admin/credit');
		            }
		        });
				}
			}
    	);
    
    
    });
};
