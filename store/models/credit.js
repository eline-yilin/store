'use strict';
var BaseController = require("./Base");
var base = new BaseController();

var getCreditList = function  (data,callback){
	var query = 'select * from credit_history ';
	query += base.processFilter(data);
	return base.query(query,callback);

	}; 
	
	var addCredit = function  (data,callback){	
		var query = base.processInsertQuery('credit_history', data);
		console.log(query);
		return base.query(query,callback);
		}; 
module.exports = function(){
this.get = getCreditList;
this.post = addCredit;
};