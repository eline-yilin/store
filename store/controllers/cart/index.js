'use strict';


var CartModel = require('../../models/cart');


module.exports = function (router) {

    var model = new CartModel();


    router.get('/', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('cart/index', model);
            }
        });
    });
    
    router.post('/', function (req, res) {
    	res.json(req.session, req.body);
    	//model = {name:req.session._csrf};
//    	res.cookie('XSRF-TOKEN', req.session._csrf);
//    	res.locals.csrftoken = req.session._csrf;
        /*res.format({
            json: function () {
                res.json(req);
            },
            html: function () {
                res.render('cart/index', model);
            }
        });*/
    });

};
