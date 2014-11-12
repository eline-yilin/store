'use strict';


var CommentModel = require('../../models/comment');


module.exports = function (router) {
   
    router.get('/', function (req, res) {
    	var model = new CommentModel();
    	var uid = req.cookies && req.cookies.uid;
    	model.get
    	({user_id:uid},
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
		                res.render('comment/index', {items:rst,name:'comment'});
		            }
		        });
				}
			}
    	);
    	
    
    });
    
    router.get('/add', function (req, res) {
    	 res.render('comment/add', {items:{},name:'comment'});
    });
    
    router.post('/add', function (req, res) {

    	var model = new CommentModel();
		var title = req.body.title;
		var content = req.body.content;
		var uid = req.cookies.uid;
		var reqBody = {title:title,content:content,user_id:uid};
		if(req.body.target_type)
		{
			reqBody.target_type = req.body.target_type;
		}
		if(req.body.target_id)
		{
			reqBody.target_id = req.body.target_id;
		}
		
		model.post(reqBody, function(err, rst) {
			if (err) {
				console.log(err);
			} else {
				
					
					if(rst && rst[0])
					{
						rst = rst[0];
						
					}
					res.format({
			            json: function () {
			                res.json(rst);
			            },
			            html: function () {
			            	res.redirect('/comment');
			            }
			        });
				
			}
		});

   
   });

};
