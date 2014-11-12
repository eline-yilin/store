'use strict';


/*module.exports = function ActivityModel() {
    return {
        name: 'activity'
    };
};*/
var makelist = function  (body, callback){		
	console.log(body);
	var query = "SELECT DISTINCT u.* FROM comment c JOIN user u ON c.user_id = u.id " +
		" WHERE c.target_type='entity' AND c.is_deleted = 0	AND c.updated < '" + body.enddate + "' " +
		" AND c.updated > '" + body.startdate + "'";
	return base.query(query, callback);	
}; 
var BaseController = require("./Base");
var base = new BaseController();
module.exports = function(){
	//this.get = getEntityList;
	//this.id = getEntityById;
	//this.post = post;
	//this.update = update;
	//this.delete = deleteItemById;
	this.make = makelist
	};