'use strict';


var entityModel = require('../../../models/entity');
var categoryModel = require('../../../models/category');

function getChild(record, rst)
{
	record.sub = [];
	for(var index in rst)
	{
		var row = rst[index];
		var parent_id = row.parent_id;
		if(parent_id == record.id)
		{
			row = getChild(row,rst);
			record.sub.push(row);
		}
	}
	return record;
} 
module.exports = function (router) {

    var model = new entityModel();


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
						var temp = [];
						for(var key in rst)
						{
							var item = rst[key];
							var pid = item['id'];
							// ITEM IN ARRAY
							if(temp[pid] )
							{
								if(item['url']){
									var url = item['url'];
									temp[pid]['url'].push( url.replace(".build", "") );
								}
							}
							// item not in array, init and push
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
							
						}
						var ret = [];
						for(var key in temp)
							{
							if(temp[key])
								{
								ret.push(temp[key]);
								}
							}
		                res.render('admin/entity/index', {items:ret,name:'entity'});
		            }
		        });
				}
			}
    	);
       
    });
    
    
    router.get('/edit/:id', function (req, res) {
    	
    	var id = req.params.id;
	 	 model.id
	 	(id,
	 		function (err, rst) {
				if (err) {
					console.log(err);
				}
				else{
					console.log(rst);
					
					
					var catmodel = new categoryModel();
					catmodel.get
			    	({},
			    		function (err, cats) {
			    		var parent = [];
			    		for(var index in cats)
			    		{
			    			var row = cats[index];
			    			var parent_id = row.parent_id;
			    			row.sub = [];
			    			if(parent_id == null)
			    			{
			    				parent.push(row);
			    			}
			    		}
			    		
			    		for(var index in parent)
			    		{
			    			var row = parent[index];
			    			parent[index] = getChild(row,cats);
			    		}

			    		var floors = [];
			    		floors.push({value:1,key:1});
			    		floors.push({value:1.5,key:1.5});
			    		for(var i = 2; i <= 5 ; i++)
			    		{
			    			floors.push({value:i,key:i});
			    		}
			    		var numbers = [];
			    		for(var i = 1; i <= 16 ; i++)
			    		{
			    			numbers.push({value:i,key:i});
			    		}
			    		var obj={items:rst,category:parent,floors:floors,numbers:numbers};

			    		res.render('admin/entity/update', {obj:obj,name:'entity'});
			    	}
			    	);
					}
				}
	 	);
    	/*var model = new categoryModel();
    	model.get
    	({parent_id:1},
    		function (err, rst) {res.render('admin/entity/update', {category:rst,name:'entity'});}
    	);*/
       
    });
    
router.post('/edit/:id', function (req, res) {
    	var id = req.params.id;
	 	var  fs = require('fs');
	 	var body = req.body;
	 	body.img = [];

	 	for(var key in req.files)
	 	{
	 		var img = req.files[key];
	 		if(img.name && img.name != '')
	 		{
	 			 var tmp_path = img.path;
	 			 var target_path =   '.build/img/upload/entity_' + img.name;
	 			console.log('try to rename ' + tmp_path + ' to ' +　target_path);
	 			try{		
	 			var fw = fs.openSync(target_path,'w');
	 			var content = fs.readFileSync(tmp_path);
	 		    fs.writeFileSync(target_path, content );
	 		    fs.close(fw);
	 		    console.log('unlink ' + tmp_path);
	 	        fs.unlinkSync(tmp_path);
	 			// fs.renameSync(tmp_path, target_path);
	 		}
	 		catch(error){console.log(error);}
 		 	    body.img.push( target_path);
 		 	    // fs.unlinkSync(tmp_path);
	 		}
	 		
	 	}
	 	body.id = id;
	 	 console.log(body.img);
		    model.update(body,function (err, rst) {
				if (err) {
					console.log(err);
					 res.render('admin/entity/edit/' + id, {error:err,name:'entity'});
				}
				else{
			        res.format({
			            json: function () {
			                res.json(rst);
			            },
			            html: function () {
			            	if(rst)
			            		{
			            		res.redirect('/admin/entity/');
			            		// res.render('admin/entity/add',
								// {sucess:rst,name:'entity'});
			            		}
			            }
			        });
					}
				});

    });
    
    
    
    router.get('/add', function (req, res) {
    	/*var gm = require('gm');
    	var imageMagick = gm.subClass({ imageMagick : true });
    	try{
    		imageMagick("/public/img/upload/thumbnail/Tulips.jpg").resize(20).autoOrient().write('//public/img/upload/thumbnail/', function(){
    			
    		});
    	//gm("/public/img/upload/thumbnail/entity_1406273094839_Tulips.jpg").resize(20);
    	}
    	catch(error){console.log(error);}
*/
    	var model = new categoryModel();
    	model.get
    	({},
    		function (err, rst) {
    		var parent = [];
    		for(var index in rst)
    		{
    			var row = rst[index];
    			var parent_id = row.parent_id;
    			
    			row.sub = [];
    			if(parent_id == null)
    			{
    				parent.push(row);
    			}
    		}
    		

    		for(var index in parent)
    		{
    			var row = parent[index];
    			
    		    var ele =  getChild(row,rst);
    			
    			parent[index] = getChild(row,rst);
    		}

    		var floors = ['1','1.5','2','3','4','5'];
    		var numbers = [1,2,3,4,5,6,7,8,9,10];
    		res.render('admin/entity/add', {floors:floors,numbers:numbers,category:parent,name:'entity'
    			});}
    	);
       
    });
    
    router.post('/add', function (req, res) {
	 	var  fs = require('fs');
	 	var gm = require('gm');
	 	//var imageMagick = gm.subClass({ imageMagick : true });
	 	var body = req.body;
	 	body.img = [];

	 	for(var key in req.files)
	 	{
	 		var img = req.files[key];
	 		if(img.name && img.name != '')
	 		{
	 			 var tmp_path = img.path;
	 			/*var target_path =   '.build/img/upload/entity_' + img.name;
	 			console.log('try to rename ' + tmp_path + ' to ' +　target_path);*/
	 			 var timestamp = new Date().getTime();
	 			var target_path = 'public/img/upload/thumbnail/entity_' + timestamp + '_' + img.name ;
	 			var full_target_path = 'public/img/upload/full/entity_' + timestamp + '_' +  img.name;
	 			try{	
	 				console.log('try to rename ' + tmp_path + ' to ' +　full_target_path);
		 			var fw = fs.openSync(full_target_path,'w');
		 			var content = fs.readFileSync(tmp_path);
		 		    fs.writeFileSync(full_target_path, content );
		 		   fs.writeFileSync(target_path, content );
		 		   fs.closeSync(fw);
		 		   //var fw = fs.openSync(target_path,'w');
		 		   //console.log(content);
		 		   console.log('try to resize ' + full_target_path + ' to ' +　target_path);
		 		  gm(target_path).resize(240);
		 		  console.log('unlink ' + tmp_path);
			 	  //fs.unlinkSync(tmp_path);
		 		 fs.unlink(tmp_path,function(){  console.log('img complete !!!!!!!');});
		 		 
		 			// fs.renameSync(tmp_path, target_path);
		 		}
		 		catch(error){console.log(error);}
	 		 	body.img.push( '/entity_' + timestamp + '_' +  img.name);
	 		 	
	 		 	    // fs.unlinkSync(tmp_path);

    			/*target_path = '.build/img/upload/entity_' + img.name;
    			console.log('try to resize ' + tmp_path + ' to ' +　target_path);*/
	 			/*imageMagick(tmp_path).resize(200).autoOrient().write('.build/img/upload/full/entity_' + img.name, 
	 					function(){		
	 				 fs.unlinkSync(tmp_path);
		 		});*/
	 			}
	 			 
	 			
	 		
	 	}

		    model.post(body,function (err, rst) {
				if (err) {
					console.log(err);
					 res.render('admin/entity/add', {error:err,name:'entity'});
				}
				else{
			        res.format({
			            json: function () {
			                res.json(rst);
			            },
			            html: function () {
			            	if(rst)
			            		{
			            		res.redirect('/admin/entity/');
			            		// res.render('admin/entity/add',
								// {sucess:rst,name:'entity'});
			            		}
			            }
			        });
					}
				});

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
