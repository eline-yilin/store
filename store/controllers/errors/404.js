'use strict';


module.exports = function (router) {

    
    router.get('/', function (req, res) {
    	var model = {};
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('errors/404', model);
            }
        });
    });
    

};
