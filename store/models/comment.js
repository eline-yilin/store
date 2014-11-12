'use strict';

var BaseController = require("./Base");
var base = new BaseController();
var getEntityCommentList = function  (data,callback){
	var query = "SELECT c.*, e.name FROM comment c  JOIN entity e ON e.id = c.target_id AND c.target_type='entity'";
	return base.query(query,callback);

	}; 
	
var getOtherCommentList = function  (data,callback){
		var query = "SELECT * FROM comment c where target_type <>'entity'";
		return base.query(query,callback);

	}; 
var getCommentList = function  (data,callback){
	var query = 'select * from comment ';
	if(data.target_type == 'all')
	{
		var ret = {};
		getEntityCommentList({},function(err,entityComment)
		{
			ret.entity_comments = entityComment;
			getOtherCommentList({}, function(err, otherComment){
				ret.other_comments = otherComment;
				return callback(null, ret);
			})
		})
	}
	else
	{
		query += base.processFilter(data);	
		return base.query(query,callback);
	}
	

	}; 
	


var addComment = function(data, callback) {
	var query = base.processInsertQuery('comment', data);

	return base.query(query, callback);
};
var updateComment = function(data, callback) {
	var query = base.processUpdateQuery('comment', data);

	return base.query(query, callback);
}; 
module.exports = function(){
this.get = getCommentList;
this.post = addComment;
this.update = updateComment;
};