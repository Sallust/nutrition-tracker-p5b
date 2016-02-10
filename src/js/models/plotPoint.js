var app = app || {};

/**
* @description Data point for creation of line charts
* @constructor
*/
app.DataPoint = Backbone.Model.extend({
	defaults: {
		id: '2016-02-09',
		date: '2016-02-09',
		cal: 2045,
		carb: 180,
		prot: 200,
		fat: 85
	}
})