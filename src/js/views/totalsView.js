//js/views/totalsView.js


var app = app || {};

console.log("grettings from the summary")

app.TotalsView = Backbone.View.extend({
	el:'#totals-view',

	template: _.template($('#totals-template').html() ),
	liTemplate: _.template($('#totals-li-template').html() ),

	initialize: function() {
		this.$ul= this.$('#totals-ul');

		this.listenTo(this.model, 'change', this.render);
		this.DRICal = app.userInfo.get('DRIcal') ; //saving local references for faster calc
		this.DRIFat = app.userInfo.get('DRIfat');
		this.DRIProt = app.userInfo.get('DRIprot');
		this.DRICarb = app.userInfo.get('DRIcarb');
		this.DRISug = app.userInfo.get('DRIsug');
		this.DRIChol = app.userInfo.get('DRIchol');
		this.DRIFib = app.userInfo.get('DRIfib');
		this.DRIArray = app.userInfo.get('DRI');
		this.keysArray = ['cal', 'fat', 'prot', 'carb', 'sug', 'chol', 'fib']
		this.render();
	},
	render: function() {
		this.$ul.html('');
/*
		var calPercent = this.model.get('cal')/this.DRICal * 100;
		var fatPercent = this.model.get('fat')/this.DRIFat * 100;
		var protPercent = this.model.get('prot')/this.DRIProt * 100;
		var carbPercent = this.model.get('carb')/this.DRICarb * 100;
		var sugPercent = this.model.get('sug')/this.DRISug * 100;
		var cholPercent = this.model.get('chol')/this.DRIChol * 100;
		var fibPercent = this.model.get('fib')/this.DRIFib * 100;
*/


		for (var i = 0; i < this.DRIArray.length; i++) {
			var key = this.keysArray[i];
			var element = this.DRIArray[i];
			var percent = this.model.returnPercent(key)
			var onOverClass = (key === 'prot' || key === 'fib') ? 'success-gold' : 'shame-red'; // when user hits protein or fiber goal, bar is red, for all others bar turns nasty red
			var percentString = percent < 100 ? percent + '%' : '100%" id="'+ onOverClass;
			this.$ul.append(this.liTemplate({
				name: element.name,
				total: this.model.get(key),
				unit: element.unit,
				DRI: element.DRI,
				percent: percentString
			}))
		};
	}
})
