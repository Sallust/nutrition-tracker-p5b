function makeLineChart(array) {




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

	var xRange = d3.scale.linear().range([margins.left, width - margins.right]).domain([0,array.length]);
	var yRange = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([ymin, ymax]);

	var xLabels = function(d) {
		console.log(d);
		return array[d] ? array[d].x : '';
	}

	var xAxis = d3.svg.axis()
		.scale(xRange)
		.tickSize(2)
		.tickSubdivide(true)
		.tickFormat(xLabels);
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

	var lineFunc = d3.svg.line()
		.x(function(d, i){

			console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + xRange(i) + ' using our xScale.');

			return xRange(i)
		})
		.y(function(d){
			console.log('Plotting Y value for data point: ' + d + ' to be at: ' + yRange(d) + " using our yScale.");
			return yRange(d.y)
		})
		.interpolate('linear');

	graph.append('svg:path')
		.attr('d', lineFunc(array))
		.attr('stroke', 'blue')
		.attr('stroke-width', 2)
		.attr('fill', 'none');





}
