
//We require that dustjs, and the dustjs-helpers have been loaded. The way we invoke this function will ensure that.
(function (dust) {

    //Create a helper called 'formatDate'
    dust.helpers.formatDate = function (chunk, context, bodies, params) {

    	var value = dust.helpers.tap(params.value, chunk, context),
        timestamp,
        month,
        date,
        year;

    timestamp = new Date(value);
    month = timestamp.getMonth() + 1;
    if(month < 10)
    {
    	month = '0' + month;
    }
    
    date = timestamp.getDate();
    if(date < 10)
	{
    	date = '0' + date;
	}
    year = timestamp.getFullYear();

    return chunk.write(month + '-' + date + '-' + year);
    };
    
  //Create a helper called 'formtImg'
    dust.helpers.formatImg = function (chunk, context, bodies, params) {

    	var value = dust.helpers.tap(params.value, chunk, context);
    	if(value){
    		var rst = value.replace(/.build/, "");
    	    if( rst.indexOf('img/upload') < 0)
    	    {
    	    	rst = '/img/upload/thumbnail' + rst;
    	    }
    	    return chunk.write(rst);
    	}
    	return chunk.write(value);

    
    };
    
  //length check
    dust.helpers.lengthControl = function (chunk, context, bodies, params) {

    	var value = dust.helpers.tap(params.value, chunk, context);
        var rst = " onKeyDown='if (this.value.length>=" + value + "){" +
        		"this.value = this.value.substr(0," + value + ")}' ";
    

    return chunk.write(rst);
    };

})(typeof exports !== 'undefined' ? module.exports = require('dustjs-helpers') : dust);

