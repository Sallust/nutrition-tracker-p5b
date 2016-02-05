//js/models/date.js

//logic surrounding the date

console.log("DATE ME PLEASE!")

var app = app || {};

var DateModel = Backbone.Model.extend({
	defaults: {
		//TODAY: new Date(Date.now()),
		//dayInFocus: new Date(Date.now()),
		//todayInFocus: true,
		tmrw: '',
		yesterday: '',
		todayFileStr:'',
		tmrwFileStr:'',
		yesterdayFileStr:''
	},
	initialize: function() {
		var oneDay = 86400000
		var d = new Date(Date.now());
		var UTC = d.valueOf();

		var tmrw = new Date(UTC + oneDay);
		var yesterday = new Date(UTC - oneDay);


		//var todayFileStr = d.toJSON().slice(0,10);
		//var tmrwFileStr = tmrw.toJSON().slice(0,10);
		//var yesterdayFileStr = yesterday.toJSON().slice(0,10);


		this.set({
			todayDateStr: d.toDateString(),
			dayInFocus: d,
			//tmrw: new Date(UTC + oneDay),
//			yesterday: new Date(UTC - oneDay),
//			todayFileStr: d.toJSON().slice(0,10),
//			tmrwFileStr: tmrw.toJSON().slice(0,10),
//			yesterdayFileStr: yesterday.toJSON().slice(0,10)
		})



		//this.set('dayInFocus', new Date(Date.now()));
		this.setRelativeDay(0)
	},
	setRelativeDay: function(direction) {
		var currentDay = this.get('dayInFocus')
		currentDay.setDate(currentDay.getDate() + direction);
		var UTC = currentDay.valueOf();

		var oneDay = 86400000;

		var tmrw = new Date(UTC + oneDay);
		var yesterday = new Date(UTC - oneDay);


		this.set({
			dayInFocus: currentDay,
			tmrw: new Date(UTC + oneDay),
			yesterday: new Date(UTC - oneDay),
			todayFileStr: currentDay.toJSON().slice(0,10),
			yesterdayDateStr: yesterday.toDateString(),
			focalDateStr: currentDay.toDateString(),
			tmrwDateStr: tmrw.toDateString(),
			todayInFocus: currentDay.toDateString() === this.get('todayDateStr') ? true : false

		})

		//this.set('todayInFocus', this.get('todayDateStr') === this.get('focalDateStr') ? true : false)

	}
});

app.dateModel = new DateModel();