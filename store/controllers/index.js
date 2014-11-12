'use strict';


var NewsModel = require('../models/news');

var EntityModel = require('../models/entity');

module.exports = function (router) {

    router.get('/', function (req, res) {
      var model = new NewsModel();
      model.get({'target_type':'system'},function(err, rst){
    	  var total = 0;
    	  if(rst)
	      {
	    		  total = rst.length;
	    		  for(var key in rst)
	    			  {
	    			   var newsItem = rst[key];
	    			   if(newsItem.img)
	    				{
	    				   newsItem.img =  newsItem.img.replace(".build", "");
	    				   rst[key] = newsItem;
	    				}
	    			  }
	     }
    	  console.log(rst);
    	  var entity_model = new EntityModel();
    	  entity_model.events
      	({},
      		function (err, news) {
      		
      		res.render('index', {items:rst,news:news, total:total,name:'index'});
      		
      	});
    	  
      });
      
        
    });
    
    router.get('/setLanguage/:locale', function (req, res) {
        res.cookie('locale', req.params.locale);
        res.redirect(req.get('referer'));
        //res.redirect('/');
    });
};
