// Define the dimensions for the SVG
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    w = 1200- margin.left - margin.right,
    h = 600 - margin.top - margin.bottom;
var barPadding = 1;

// Load the CSV data
d3.csv("https://gist.githubusercontent.com/AllenHo2/31a1cde4e1ff72b994ede5e42ec59bc1/raw/ec948ebf8d826a2746db3370fcd7c53d81a832e3/expensive.csv")
  .then(function(data) {

    // Create the SVG element
    var svg = d3.select("#barChart")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales for x and y axes
    var x = d3.scaleBand()
      .domain(data.map(function(d) { return d["State"]; }))
      .range([0, w])
      .padding(0.2); // Adjust padding as needed

    var y = d3.scaleLinear()
      .domain([d3.max(data, function(d) { return d["groceryCost"] * 1.25; }), 0])
      .nice()
      .range([h, 0]);

    //   console.log(x(d["State"]));
    // Create bars
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d) { 
        return x(d["State"]);
       })
      .attr("y", function(d) { 
        return y(d["groceryCost"]) ; 
       })
      .attr("width", x.bandwidth())
      .attr("height",d => (h - y(d["groceryCost"])))

      .attr("fill", function(d) {
        return "rgb(" + Math.round(Math.random() * 256) + ", " + Math.round(Math.random() * 256) + ", " + Math.round(Math.random() * 256) + ")";
      })
      .append("title")
      .text( d => "$ " + d["groceryCost"] + " billion");

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate( 0 , " + h + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", 10)
      .style("fill", "0");

    var yAxis = d3.axisLeft()
                  .scale(y)
    svg.append("g")
    .attr("class", "axis")
    .call(yAxis);

    svg.append("text")
      .attr("x", w / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .text("Bar Chart")
      .style("font-size", "20px");

    svg.append("text")
      .attr("x", w / 2)
      .attr("y", h + margin.bottom / 2)
      .attr("text-anchor", "middle")
      .text("The bar colors do not have any meaning and misleads the reader + no legend. There is also a lot of visual cluttering at the bottom of the chart and no tooltips + *Giant Hamset in the Middle")
      .style("font-size", "14px");

  svg.append("text")
    .attr("transform", "translate(225,400)")
    .style("font-size", '200px')
    .style("stroke", "black")
    .style("fill", "yellow")
    .text("Hamster");
    
  })












