//js/views/totalsView.js

//I will store the view for the totals

var app = app || {};

console.log("grettings from the summary")

app.TotalsView = Backbone.View.extend({
	el:'#totals-view',

	template: _.template($('#totals-template').html() ),

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);

		this.render();
	},
	render: function() {
		this.$el.html(this.template({
			calorieTotal: this.model.get('cal')
		}))
		console.log('I have noticed a change');
	}
})
