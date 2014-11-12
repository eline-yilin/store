'use strict';


var EntityModel = require('../../models/entity');
var categoryModel = require('../../models/category');

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

    var model = new EntityModel();


    router.get('/', function (req, res) {
    	var reqBody = {};
        if(req.query.floor)
        	{
        	reqBody.floor = req.query.floor;
        	
        	}
        if(req.query.category)
    	{
    	reqBody.category = req.query.category;
    	
    	}
        if(req.query.q)
    	{
    	reqBody.q = req.query.q;
    	
    	}
    	model.get
    	(reqBody,
    		function (err, rst) {
			if (err) {
				console.log(err);
			}
			else{
				var temp = [];
				for(var key in rst)
				{
					
					var item = rst[key];
					var pid = item['id'];
					var shape = item['shape'];
					//ITEM IN ARRAY
					if(temp[pid] )
					{
						if(item['url']){
							var url = item['url'];
							temp[pid]['url'].push( {value:url.replace(".build", ""), shape:shape} );
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
						
						item['url'] = new Array({value:url,shape:shape});
						temp[pid] = item;
						console.log(temp);
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
				var model = new categoryModel();
		    	model.get
		    	({},
		    		function (err, cat) {
		    		var parent = [];
		    		for(var index in cat)
		    		{
		    			var row = cat[index];
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
		    			parent[index] = getChild(row,cat);
		    		}

		    		res.render('entity/index', {items:ret,category:parent,query:req.query,name:'entity'});
		    	}
		    	);
                
				}
			}
    	);
       
    
    });
    
    router.get('/id/:id', function (req, res) {console.log('ccc ' + JSON.stringify(res.locals.userObj));
   	 var id = req.params.id;
  	 model.id
  	(id,
  		function (err, rst) {
			if (err) {
				console.log(err);
			}
			else{
				console.log(rst);
				if(rst.imgs)
					{
					for(var key in rst.imgs)
					{
						var item = rst.imgs[key];
						var url = item.url;
						url = url.replace(".build", "");
						rst.imgs[key].url = url;

					}
			    }
                res.render('entity/id', {items:rst,name:'entity'});
				}
			}
  	);
});

};
