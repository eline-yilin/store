'use strict';


var CategoryModel = require('../../../models/category');


module.exports = function (router) {

    var model = new CategoryModel();


    router.get('/', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('admin/category/index', model);
            }
        });
    });

};
