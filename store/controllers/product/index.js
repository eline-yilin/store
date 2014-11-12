'use strict';


var ProductModel = require('../../models/product');


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
								console.log('////' + JSON.stringify(rst));
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
									
								}
								var ret = [];
								for(var key in temp)
									{
									if(temp[key])
									{
									 ret.push(temp[key]);	
									}
									}
								
				                res.render('product/index', {products:ret,name:'product'});
				            }
				        });
						}
					}
		    	);
    });
    router.get('/id/:id', function (req, res) {
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
		                res.render('product/id', {products:rst,name:'product'});
		            }
		        });
				}
			}
   	);
});

};
