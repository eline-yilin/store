'use strict';
var BaseController = require("./Base");
var base = new BaseController();

var getProductList = function  (data, callback){	
	var query = 'select p.*, i.url from product p LEFT JOIN product_img i on p.id = i.product_id where p.is_deleted <> 1';
	return base.query(query, callback);
}; 
	
var getProductById = function  (id, callback){	
	var query = 'select * from product where id=' + id;
	return base.getOne(query, callback);	
}; 

var deleteItemById = function  (id, callback){	
	var query = 'UPDATE product SET is_deleted = 1 where id=' + id;
	return base.query(query, callback);	
}; 


var post = function  (data, callback){
	var query = "insert into product (category_id,name,price,description,entity_id,weight) values (" +　( data['category'] || 0) + ",'"
	+ data['productname'] + "','" + data['price'] + "','"
	+ data['description'] + "',"
	+ (data['entity'] || 'null') + ","
	+ ( data['weight'] || 0)
	+ ")";

	return base.query(query, function(err, rst){
		if(err){
			throw err;
		}
		else{
			var pid = rst['insertId'];
			var insert_img_query = "insert into product_img (product_id, url) values ";
			var imgs = data['img'];
			for(var i = 0; i <  imgs.length; i++)
			{
				insert_img_query += "(" + pid + ",'" + imgs[i] + "')";
				if(i != (imgs.length - 1) )
					{
					insert_img_query += ",";
					}
			}
			return base.query(insert_img_query, callback);
		}
	});	
}; 
	
module.exports = function(){
this.get = getProductList;
this.id = getProductById;
this.post = post;
this.delete = deleteItemById;
};

