'use strict';
var BaseController = require("./Base");
var base = new BaseController();
module.exports = base.extend(function () {
return {
	name: 'cart'
}

});
