'use strict';


var CreditModel = require('../../models/credit');


module.exports = function (router) {

    var model = new CreditModel();


    router.get('/', function (req, res) {
        
    	model.get
    	(
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
		                res.render('credit/index', {credits:rst,name:'credit'});
		            }
		        });
				}
			}
    	);
    	
    });
    
    router.post('/', function (req, res) {
    	var uid = req.cookies && req.cookies.uid;
		req.body.userid = uid;
    	model.post
    	(req.body,
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
		                res.render('credit/index', {credits:rst,name:'credit'});
		            }
		        });
				}
			}
    	);
    
    });

};
