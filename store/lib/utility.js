'use strict';
module.exports = function() {
	return {
		convertDateTime : function convertDateTime(date, format)
		{
			if(! date instanceof Date){
				alert(date);
				date = new Date(date);
			}
			var dd = date.getDate();
			var mm = date.getMonth()+1; //January is 0!
			var yyyy = date.getFullYear();

			if(dd<10) {
			    dd='0'+dd
			} 

			if(mm<10) {
			    mm='0'+mm
			} 
		    switch(format){
		    case 'mm/dd/yyyy': return mm+'/'+dd+'/'+yyyy;
		    case 'yyyy-mm-dd': return yyyy + '-' + mm + '-' + dd;
		    default : return yyyy +'/'+mm+'/'+dd;
		    }
			
		},
		
		}
	};

