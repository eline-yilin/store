'use strict';


var OrderModel = require('../../../models/order');


module.exports = function (router) {

    var model = new OrderModel();


    router.get('/', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('admin/order/index', model);
            }
        });
    });

};
