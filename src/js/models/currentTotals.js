//js/models/currentTotals.js

/**
* @description Calculates running totals
* @constructor
* @param none - only one instance
*/
var app = app || {};

var CurrentTotals = Backbone.Model.extend({
	defaults: {
		cal: 0,
		fat: 0,
		chol: 0,
		carb: 0,
		sug: 0,
		prot: 0,
		fib: 0,
	},
	/**
	* @description listen for changes to major food list;
	* also listens for change of foodList variable on date changes
	*/
	initialize: function() {
		this.listenTo(app.foodList, 'all', this.recalcTotals);
		this.listenTo(app.dateModel,'new-list', this.updateListeners);
	},
	updateListeners: function() {
		this.listenTo(app.foodList, 'all', this.recalcTotals);
	},

	recalcTotals: function() {
		var cal=0;
		var fat= 0;
		var chol=0;
		var carb=0;
		var sug=0;
		var prot=0;
		var fib=0;
		app.foodList.each(function(food) {
			cal += food.get('calories');
			fat += food.get('fat');
			chol += food.get('chol');
			carb += food.get('carb');
			sug += food.get('sug');
			prot += food.get('prot');
			fib += food.get('fib');
		})
		this. set({
			cal: cal,
			fat: fat,
			chol: chol,
			carb: carb,
			sug: sug,
			prot: prot,
			fib: fib
		})
	},
	returnPercent: function(key) {
		return this.get(key) / app.userInfo.get('DRI'+key) * 100
	}
})

app.currentTotals = new CurrentTotals;