console.log("I'm ready to summarize")


 var app = app || {};

 app.SummaryView = Backbone.View.extend({
 	el:'#summary',

 	template: _.template($('#summary-template').html() ),

 	initialize: function() {
 		this.listenTo(this.model, 'change', this.render);
 		this.render();
 	},
 	render: function() {
 		var DRICal = app.userInfo.get('DRICal');
 		var consumed = this.model.get('cal');
 		var left = Math.abs(DRICal - this.model.get('cal'));
 		var isOver = consumed >= DRICal ? true : false;

 		this.$el.html(this.template({
 			consumed: consumed,
 			left: left,
 			budget: DRICal,
 			isOver: isOver
 		}));

 		makeDonut( left, consumed ,'#donut');
 		//makeDonut(99, 1 ,'#donut');
		if ( consumed < 10) {
			$('.graph-consumed').hide()
		 } else if ( left < 50) {
		 	$('.graph-left').hide()
		 } else {
		 	$('.graph-consumed').show();
		 	$('.graph-left').show();
		 }


 		//if this.model.get('')



 	}

 })

 app.summaryView = new app.SummaryView({model: app.currentTotals});
