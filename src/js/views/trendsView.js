//js/views/trendsView.js
var app = app || {};
/**
* @description Builds view of line charts section
* @constructor View
* @param {collection}  app.totals - collection of nutrient totals over time
*/
app.TrendsView = Backbone.View.extend({
	el:'#trends',

	template: _.template($('#trends-template').html() ),

	initialize: function () {
		this.$charts = this.$('#trends-view');
		this.listenTo(this.collection, 'sync', this.render);

		this.charts = ['Total Calories', 'Protein', 'Fats', 'Carbs'];
		this.myKeys = ['cal','prot','fat','carb'];
	},
	render: function() {
		this.$charts. html(''); //clear old charts
		if (this.collection.length <= 2) {
			this.$el.hide(); //don't show this section when there is too little trends data (i.e first day)
		} else {
			this.$el.show();
			for (var i = 0; i < this.charts.length; i++) {
				var graphOrder = 'graph-' + (i+1);
				var DRIName = 'DRI' + this.myKeys[i];
				this.$charts.append(this.template({className: graphOrder}));//appends svg element with selector
				/**
				* @description Creates line chart for this nutrient, passing needed data & keys
				*/
				makeLineChart(this.collection.toJSON(), this.charts[i], 575, 200, this.myKeys[i], '.' + graphOrder, app.userInfo.get(DRIName));
			}
		}
	}
});



