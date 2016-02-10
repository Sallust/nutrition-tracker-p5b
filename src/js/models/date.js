//js/models/date.js
var app = app || {};

/**
* @description Holds date logic for changing date and saving files
* @constructor
* @param none - only one instance
*/
var DateModel = Backbone.Model.extend({
	defaults: {
		tmrw: '',
		yesterday: '',
		todayFileStr:'',
		tmrwFileStr:'',
		yesterdayFileStr:''
	},
	initialize: function() {
		var d = new Date(Date.now());
		this.set({
			todayDateStr: d.toDateString(),
			dayInFocus: d,
		});
		this.setRelativeDay(0);
	},
	/**
	* @description Sets attributes in relation to previous date
	* @param {number} direction - 0 on init, but -1 or 1 to represent tmrw and yesterday
	*/
	setRelativeDay: function(direction) {
		var currentDay = this.get('dayInFocus');
		currentDay.setDate(currentDay.getDate() + direction); //moves date forward or backward

		var UTC = currentDay.valueOf(); // Actual Value of date so it can be manipulated
		var oneDay = 86400000; //milliseconds in a day
		var tmrw = new Date(UTC + oneDay); //new Date method for access to date methods
		var yesterday = new Date(UTC - oneDay);
		var GMT = new Date(UTC - 18000000 );  //milliseconds in 5 hrs; so toJSON returns todays date in a clean format

		this.set({
			dayInFocus: currentDay,
			//tmrw: new Date(UTC + oneDay),
			//yesterday: new Date(UTC - oneDay),
			todayFileStr: GMT.toJSON().slice(0,10), //for file naming
			yesterdayDateStr: yesterday.toDateString(), //this & next 2 are for View
			focalDateStr: currentDay.toDateString(),
			tmrwDateStr: tmrw.toDateString(),
			todayInFocus: currentDay.toDateString() === this.get('todayDateStr') ? true : false //determines if Today will be "today" or a date
		});
	}
});

app.dateModel = new DateModel();
