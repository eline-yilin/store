'use strict';
module.exports = function (router) {

    router.get('/', function (req, res) {
        
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('admin/activity/index', model);
            }
        });
    });
router.get('/comment', function (req, res) {
        
        res.format({
            json: function () {
                res.json({name:'activity'});
            },
            html: function () {
                res.render('admin/activity/comment', {name:'activity'});
            }
        });
    });
router.post('/comment', function (req, res) {	
 	var body = req.body;
 	var ActivityModel = require('../../../models/activity');

	var model = new ActivityModel();
    model.post(body,function (err, rst) {
			if (err) {
				console.log(err);
				 res.render('admin/activity/comment', {error:err,name:'activity'});
			}
			else{
		        res.format({
		            json: function () {
		                res.json(rst);
		            },
		            html: function () {
		            	if(rst)
		            		{
		            		 res.render('admin/activity/comment', {list:rst,name:'activity'});
		            		//res.render('admin/product/add', {sucess:rst,name:'product'});
		            		}
		            }
		        });
				}
			});


});

router.get('/comment/make', function (req, res) {

	var startdate = req.query.startdate;
	var enddate = req.query.enddate;
	var number = req.query.number;
 	var ActivityModel = require('../../../models/activity');

	var model = new ActivityModel();
    model.make({startdate:startdate,enddate:enddate,number:number},function (err, rst) {
			if (err) {
				console.log(err);
				res.json(err);
			}
			else{
		        res.format({
		            json: function () {
		            	console.log(rst);
		            	var rsp = randomNfromArray(rst,number);
		                res.json(rsp);
		            },
		            html: function () {
		            	
		            }
		        });
				}
			});


});
};

function randomNfromArray(arr, n){
     if(arr.length <= n)
     {
    	 n = arr.length;
     }
	 var $filtered = new Array(); //create a new jQuery object we're going to fill
	 var temp = shuffle(arr);
	 for(var i = 0; i < n ; i++)
	 {
		 var data = temp[i];
		 data['token'] = generateToken(6,'0123456789');
		 $filtered.push(data);
	 }
	 return $filtered;
}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function generateToken(n,possible)
{
    var text = "";
    if(!possible) 
    	possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < n; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}