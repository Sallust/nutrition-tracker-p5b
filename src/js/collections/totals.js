var app = app || {};

var Totals = Backbone.Firebase.Collection.extend({

	model: app.DataPoint,

	url:'https://my-nutrition-tracker.firebaseio.com/totals',

	initialize: function() {
		this.listenTo(app.currentTotals, 'change', this.addValue)
	},

	addValue: function( totals ) {
		console.log('ADD ME PLEASE')
		this.add({
			id: app.dateModel.get('todayFileStr'),
			x: app.dateModel.get('todayFileStr'),
			y: totals.get('cal')
		},{merge: true})

	},
	comparator: function( dataPoint) {
		return dataPoint.get('x')
	}



})

app.totals = new Totals();