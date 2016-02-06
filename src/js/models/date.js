//js/models/date.js

//logic surrounding the date

console.log("DATE ME PLEASE!")

var app = app || {};

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

		this.setRelativeDay(0)
	},
	setRelativeDay: function(direction) {
		var currentDay = this.get('dayInFocus');
		currentDay.setDate(currentDay.getDate() + direction);

		var UTC = currentDay.valueOf();
		var oneDay = 86400000;
		var tmrw = new Date(UTC + oneDay);
		var yesterday = new Date(UTC - oneDay);
		var GMT = new Date(UTC - 18000000 );  //milliseconds in 5 hrs; so toJSON returns todays date in a clean format

		this.set({
			dayInFocus: currentDay,
			tmrw: new Date(UTC + oneDay),
			yesterday: new Date(UTC - oneDay),
			todayFileStr: GMT.toJSON().slice(0,10),
			yesterdayDateStr: yesterday.toDateString(),
			focalDateStr: currentDay.toDateString(),
			tmrwDateStr: tmrw.toDateString(),
			todayInFocus: currentDay.toDateString() === this.get('todayDateStr') ? true : false
		})

		//this.set('todayInFocus', this.get('todayDateStr') === this.get('focalDateStr') ? true : false)

	}
});

app.dateModel = new DateModel();
