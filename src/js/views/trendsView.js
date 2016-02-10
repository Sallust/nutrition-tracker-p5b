//js/views/trendsView.js


var app = app || {};

app.TrendsView = Backbone.View.extend({
	el:'#trends',

	template: _.template($('#trends-template').html() ),

	initialize: function () {
		this.$charts = this.$('#trends-view')
		this.$input = this.$('#new-todo');
		this.listenTo(this.collection, 'sync', this.render)

		this.charts = ['Total Calories', 'Protein', 'Fats', 'Carbs'];
		this.myKeys = ['cal','prot','fat','carb'];



	},

	render: function() {
		this.$charts. html('')
		if (this.collection.length <= 0) {
			this.$el.hide() //don't show this section when there is no trends data (i.e first day)
		} else {
			this.$el.show()
			for (var i = 0; i < this.charts.length; i++) {
				var graphOrder = 'graph-' + (i+1);
				var DRIName = 'DRI' + this.myKeys[i];
				this.$charts.append(this.template({className: graphOrder}));
				makeLineChart(this.collection.toJSON(), this.charts[i], 600, 200, this.myKeys[i], '.' + graphOrder, app.userInfo.get(DRIName))
			};
		}
	}
})

