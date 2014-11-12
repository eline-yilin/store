'use strict';


var ImageModel = require('../../models/image');


module.exports = function (router) {

    var model = new ImageModel();


    router.get('/', function (req, res) {
        var type = req.query.type;
        if(type == 'map')
        {
        	var floors = [1.5,2,3,4];
        	res.render('image/map', {name:'image',floors:floors});
        }
        else
        {
        	res.redirect('/');
        }
        
        
    });
    router.get('/:format/:id', function (req, res) {
        var format = req.params.format;
        var id = req.params.id;
        res.render('image/id', {url:'/img/upload/' + id + '.' + format,name:'image'});

        
        
    });

};
