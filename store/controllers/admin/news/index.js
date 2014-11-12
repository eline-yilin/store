'use strict';


var NewsModel = require('../../../models/news');
var entityModel = require('../../../models/entity');
var utilityModel = require('../../../lib/utility');
module.exports = function (router) {

    router.get('/', function (req, res) {
    	var model = new NewsModel();
    	model.get({},function(err,rst){
    		res.render('admin/news/index', {items:rst,name:'news'});
    	});
    	
    });
    
    router.get('/add', function (req, res) {
    var model = new entityModel();
    model.get
	({},
		function (err, rst) {
		if (err) {
			console.log(err);
		}
		else{
			res.render('admin/news/add', {items:{entity:rst},name:'news'});
		}
	});
	
	
    });
    
    router.post('/add', function (req, res) {
    	var  fs = require('fs');
    	var sizeOf = require('image-size');
    	var model = new NewsModel();
    	var utility = new utilityModel();
    	var body = req.body;
    	console.log(body);
    	var imgs = [];
    	var uid = req.cookies && req.cookies.uid;

    	for(var key in req.files)
	 	{
	 		var img = req.files[key];
	 		if(img.name && img.name != '')
	 		{ 
	 			
	 			
	 			 var tmp_path = img.path;
	 			var dimensions = sizeOf(tmp_path);
	 			 console.log('image size' + dimensions.width, dimensions.height);
	 			 var width = dimensions.width;
	 			 var height = dimensions.height;
	 			 if(width!=320 || height!=240)
	 			{
	 				res.render('admin/news/add', {sizewarning:true, item: body,name:'news'});
	 				return false;
	 			}
	 			 var target_path =   '.build/img/upload/news_' + img.name;
	 			console.log('try to rename ' + tmp_path + ' to ' +　target_path);
	 			try{		
	 			var fw = fs.openSync(target_path,'w');
	 			var content = fs.readFileSync(tmp_path);
	 		    fs.writeFileSync(target_path, content );
	 		    fs.close(fw);
	 		    console.log('unlink ' + tmp_path);
	 	        fs.unlinkSync(tmp_path);
	 			//fs.renameSync(tmp_path, target_path);
	 		}
	 		catch(error){console.log(error);}
	 		imgs.push( target_path);
 		 	    //fs.unlinkSync(tmp_path); 
	 		}
	 		
	 	}
    	
    	var request ={
    			title: body['title'],
    			content: body['content'],
    			url: body['url'],
    			weight: body['weight'],
    			img:imgs[0],
    			user_id:uid,
    			target_type:body['target_type'],
    			target_id:body['target_id'],
    			start_date:utility.convertDateTime(new Date(body['start_date']),'yyyy-mm-dd'),
    			end_date:utility.convertDateTime(new Date(body['end_date']),'yyyy-mm-dd'),
    			
    	};
    	model.post(request,function(err, rst){
    		if (err) {
    			console.log(err);
    		}
    		else{
    			res.redirect('/admin/news');
    		}
    	});
    	
    	
        });

};
