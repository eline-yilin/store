'use strict';


var ProductModel = require('../../../models/product');


module.exports = function (router) {

    var model = new ProductModel();


    router.get('/', function (req, res) {

   	 model.get
   	({},
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
		            	//products = JSON.stringify(products);
						console.log('////' + rst);
						var temp = [];
						for(var key in rst)
						{
							var item = rst[key];
							var pid = item['id'];
							//ITEM IN ARRAY
							if(temp[pid] )
							{
								if(item['url']){
									var url = item['url'];
									temp[pid]['url'].push( url.replace(".build", "") );
								}
							}
							//item not in array, init and push
							else
							{
								var url = item['url'];
								if(url)
								{
									url = url.replace(".build", "");
								}
								
								item['url'] = new Array(url);
								temp[pid] = item;
							}
							
						}console.log(temp);
						var ret =[];
						for(var key in temp)
						{
						if(temp[key])
						{
						 ret.push(temp[key]);	
						}
						}
		                res.render('admin/product/index', {products:ret,name:'product'});
		            }
		        });
				}
			}
   	);

    });
    
    router.get('/add', function (req, res) {
    	var EntityModel = require('../../../models/entity');
    	 var model = new EntityModel();
    	 model.get
    	   	({},
    	   		function (err, rst) {
    				if (err) {
    					console.log(err);
    				}
    				else{
				        res.format({
				            json: function () {
				                res.json(model);
				            },
				            html: function () {
				                res.render('admin/product/add', {data:{entities:rst}, name:'product'});
				            }
				        });
    				}
    	   	});
    });
    
    	router.post('/add', function (req, res) {
	 	var  fs = require('fs');
	 	var sizeOf = require('image-size');
	 	var body = req.body;
	 	body.img = [];
        var isImgValid = true;
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
	 			 if(width!=220 || height!=220)
	 			{
	 				isImgValid = false;
	 				break;	
	 			}
	 			 var target_path =   '.build/img/upload/' + img.name;
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
 		 	    body.img.push( target_path);
 		 	    //fs.unlinkSync(tmp_path); 
	 		}
	 		
	 	}
	    if(!isImgValid)
	    {
	    	var EntityModel = require('../../../models/entity');
			var entitymodel = new EntityModel();
			entitymodel.get
	    	   	({},
	    	   		function (err, rst) {
	    				if (err) {
	    					console.log(err);
	    				}
	    				else{
	    					res.render('admin/product/add', {data:{entities:rst},sizewarning:true, item: body,name:'product'});
	    					
	    					return false;
	    				}
	    	   	});
			//res.render('admin/product/add', {sizewarning:true, item: body,name:'product'});
			return false;
	    }
	    else
	    {
	 	 console.log(body.img);
		    model.post(body,function (err, rst) {
				if (err) {
					console.log(err);
					 res.render('admin/product/add', {error:err,name:'product'});
				}
				else{
			        res.format({
			            json: function () {
			                res.json(rst);
			            },
			            html: function () {
			            	if(rst)
			            		{
			            		res.redirect('/admin/product/');
			            		//res.render('admin/product/add', {sucess:rst,name:'product'});
			            		}
			            }
			        });
					}
				});
	    }
	    
	    
    	

    });
    	
    	router.get('/edit/:id', function (req, res) {
    		var id = req.params.id;
    		console.log('////////////////product id ' +　id  + '//////////////////////');
    	   	 model.id
    	   	(id,
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
    			                res.render('admin/product/edit', {products:rst,name:'product'});
    			            }
    			        });
    					}
    				}
    	   	);
            
        });
    	
    	router.post('/delete/:id', function (req, res) {
    		var id = req.params.id;
    		console.log('////////////////delete product id ' +　id  + '//////////////////////');
    	   	 model.delete
    	   	(id,
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
    			                res.redirect('/admin/product/');
    			            }
    			        });
    					}
    				}
    	   	);
            
        });

};
