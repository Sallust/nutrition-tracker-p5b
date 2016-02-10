var testData = {
	calories:[1,8]
};



function makeDonut(left, consumed, divID, colorArray) {

	var myData =  {
		calories:[left, consumed]
	};
	//initial code below is from d3 example. I made it modifiable by a function so it can be easily reused with different data
	var width = 200,    //set dimensions
	    height = 200,
	    radius = Math.min(width, height) / 2;

	var classes = ['graph-left', 'graph-consumed'];

	var color = d3.scale.ordinal()			//set colors grao match palette
	    .range(colorArray); //grey, orange

	var arc = d3.svg.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(radius - 30);

	var pie = d3.layout.pie()
	    .sort(null)
	    //.value(function(d) { return d.level; });
	var labels = [ "left","consumed"]

	var svg = d3.select(divID).append("svg")  //now appends chart to divID set in function
	    .attr("width", width)
	    .attr("height", height)
	 	.append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	 //now gets data csv in url set in function.

	  //data.forEach(function(d) {
	    //d.level = +d.level;              //level is set in function so can later be set to match at different csv with different variables
	 // });

	 var g = svg.selectAll(".arc")
	    .data(pie(myData.calories))
	    .enter().append("g")
	    .attr("class", "arc");

	  g.append("path")
	      .attr("d", arc)
	      .style("fill", function(d,i) { return color(i); });

	  g.append("text")
	      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })

	      .attr("dy", ".35em")
	      .style("text-anchor", "middle")
	      .style('fill', '#37474F')
	      .attr('class', function(d,i) { return classes[i]; })
	      //.classed("graph-text", true)
	      .text(function(d,i) { return labels[i]; });




}