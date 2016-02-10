//js/views/totalsView.js
var app = app || {};
/**
* @description Contsructs view of percent graphs
* @constructor View
* @param {model}  app.currentTotals - gets passed the model with the current totals
*/
app.TotalsView = Backbone.View.extend({

	el:'#totals-view',

	liTemplate: _.template($('#totals-li-template').html() ),

	initialize: function() {
		this.$ul= this.$('#totals-ul');
		this.listenTo(this.model, 'change', this.render);
		this.DRIArray = app.userInfo.get('DRI');// array of elements with 3 keys DRI, name, unit
		this.keysArray = ['cal', 'fat', 'prot', 'carb', 'sug', 'chol', 'fib'];

		this.render();
	},
	/**
	* @description Loops over template for each nutrient
	* @param {model}  app.currentTotals - gets passed the model with the current totals
	*/
	render: function() {
		this.$ul.html('');

		for (var i = 0; i < this.DRIArray.length; i++) {
			var key = this.keysArray[i];
			var element = this.DRIArray[i];
			var percent = this.model.returnPercent(key);
			var onOverClass = (key === 'prot' || key === 'fib') ? 'success-gold' : 'shame-red'; // when user hits protein or fiber goal, bar is red, for all others bar turns nasty red
			var percentString = percent < 100 ? percent + '%' : '100%" id="'+ onOverClass;
			this.$ul.append(this.liTemplate({
				name: element.name,
				total: this.model.get(key),
				unit: element.unit,
				DRI: element.DRI,
				percent: percentString
			}));
		};
	}
})


