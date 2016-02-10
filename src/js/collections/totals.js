var app = app || {};

/**
* @description Constructs totals collection by fetching from server
* @constructor
* @param none - only one instance
*/
var Totals = Backbone.Firebase.Collection.extend({

	model: app.DataPoint,

	url:'https://my-nutrition-tracker.firebaseio.com/totals',

	initialize: function() {
		this.listenTo(app.currentTotals, 'change', this.addValue);
		var totalsTimeout = wikiRequestTimeout = setTimeout(function() {
			alert("Error getting trends data. Pleaser try again later please! We are sure you're doing great though!")
	    }, 5000);
	    this.on('sync', function() {
	    	clearTimeout(totalsTimeout)
	    })
	},
	/**
	* @description Takes current total and adds it to the collection
	* @param {model} totals -  on 'change', the changed model, app.currentTotals gets passed as first param
	*/
	addValue: function( totals ) {
		this.add({
			id: app.dateModel.get('todayFileStr'), //by setting id and setting to date, only one entry per date exists
			date: app.dateModel.get('todayFileStr'),
			cal: totals.get('cal'),
			carb: totals.get('carb'),
			prot: totals.get('prot'),
			fat: totals.get('fat')
		},{merge: true});

	},
	comparator: function( dataPoint) {
		return dataPoint.get('date'); //chronological order
	}
});

app.totals = new Totals();