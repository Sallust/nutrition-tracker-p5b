function makeLineChart(param1, param2) {




	var DATALENGTH = 7;


	var width = 1000;
	var height = 500;
	var margins = {
		top: 20,
		right: 20,
		bottom: 20,
		left:50
	}

	var ymin = app.totals.min(function(model){
			return model.get('y')
		}).get('y')

	var ymax = app.totals.max(function(model){
			return model.get('y')
		}).get('y')

	var graph = d3.select('#line-graph');

	var xRange = d3.scale.linear().range([margins.left, width - margins.right]).domain([0,app.totals.length]);
	var yRange = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([ymin, ymax]);

	var xAxis = d3.svg.axis()
		.scale(xRange)
		.tickSize(2)
		.tickSubdivide(true);
	var yAxis = d3.svg.axis()
		.scale(yRange)
		.tickSize(10) //this is how far the axis labels are from axis
		.orient('left')
		.tickSubdivide(true);

	graph.append('svg:g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,'+ (height - margins.bottom) + ')')
		.call(xAxis);

	graph.append('svg:g')
		.attr('class', 'y axis')
		.attr('transform', 'translate('+ (margins.left) + ',0)')
		.call(yAxis);





}
makeLineChart(1,2);