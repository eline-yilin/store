'use strict';
var BaseController = require("./Base");
var base = new BaseController();

var getItemtList = function  (data,callback){
	var query = 'select * from entity_category  ';
	query += base.processFilter(data);
	return base.query(query,callback);

	}; 

module.exports = function(){
		this.get = getItemtList;
		//this.post = addCredit;
};