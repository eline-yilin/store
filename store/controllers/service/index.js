'use strict';


var ServiceModel = require('../../models/service');


module.exports = function (router) {

    var model = new ServiceModel();


    router.get('/', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('service/index', model);
            }
        });
    });

};
