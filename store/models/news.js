'use strict'; 

var BaseController = require("./Base");
var base = new BaseController();
var getItemList = function  (data,callback){
	var query = 'select * from news ';
	query += base.processFilter(data);
	query += ' ORDER BY weight,updated DESC';
	return base.query(query,callback);

	}; 
	
	var addItem = function  (data,callback){
		var query = base.processInsertQuery('news', data);
		console.log(query);
		return base.query(query,callback);
		}; 
module.exports = function(){
this.get = getItemList;
this.post = addItem;
};