//js/views/trendsView.js
console.log("I'm a trendy View")

var app = app || {};

app.TrendsView = Backbone.View.extend({
	el:'#trends',

	template: _.template($('#trends-template').html() ),

	initialize: function () {
		this.$charts = this.$('#trends-view')
		this.$input = this.$('#new-todo');
		this.listenTo(this.collection, 'sync', this.render)


	},

	render: function() {
		this.$charts. html('')
		if (this.collection.length <= 0) {
			this.$el.hide() //don't show this section when there is no trends data (i.e first day)
		} else {
			this.$el.show()
			this.$charts.append(this.template({className:'graph-1'}))
			makeLineChart(this.collection.toJSON(), 'Total Calories', 600, 300, 'y', '.graph-1');
			this.$charts.append(this.template({className:'graph-2'}))
			makeLineChart(this.collection.toJSON(), 'Protein', 600, 300, 'prot', '.graph-2');

		}



		//this.$charts.html(this.template({




		//}))




	}



})

