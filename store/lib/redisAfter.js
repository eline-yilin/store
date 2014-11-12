'use strict';
var redis = require("redis");
var cfg = require("config");
var connect = cfg['redisconfig'];
var host = connect['host'] || '127.0.0.1';
var port = connect['port'] || '6379';
var option =  connect['option'] || {};
var client = redis.createClient(port,host,option);

    // if you'd like to select database 3, instead of 0 (default), call
    // client.select(3, function() { /* ... */ });

    client.on("error", function (err) {
        console.log("Error " + err);
    });

    
    
    module.exports = function() {
    	return function(req, res, next) {
    		console.log('bbbbb ' + JSON.stringify(res.locals.userObj));
    		client.set(req.url, "OK");

    	    // This will return a JavaScript String
    	    client.get(req.url, function (err, reply) {
    	        console.log(reply.toString()); // Will print `OK`
    	    });
    	    res.json();return false;
    	    next();
    		
    	};
    };