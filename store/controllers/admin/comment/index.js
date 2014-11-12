'use strict';


var CommentModel = require('../../../models/comment');


module.exports = function (router) {

    var model = new CommentModel();


    router.get('/', function (req, res) {
    	

    	var model = new CommentModel();
    	//var uid = req.cookies && req.cookies.uid;
    	model.get
    	({target_type:'all'},
    		function (err, rst) {
			if (err) {
				console.log(err);
			}
			else{
				console.log('////' + JSON.stringify(rst));
                res.render('admin/comment/index', {items:rst,name:'comment'});
				}
			}
    	);
    	
    
    
    });
    
router.post('/status', function (req, res) {
	    var id = req.body.id;
	    var status = req.body.status;
    	var model = new CommentModel();
    	model.update
    	({id:id,status_id:status},
    		function (err, rst) {
			if (err) {
				console.log(err);
			}
			else{
				console.log('////' + JSON.stringify(rst));
				 res.json(rst);
				}
			}
    	);
    	
    
    
    });

};
