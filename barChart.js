// Define the dimensions for the SVG
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    w = 1200- margin.left - margin.right,
    h = 600 - margin.top - margin.bottom;
var barPadding = 1;

// Load the CSV data
d3.csv("https://gist.githubusercontent.com/AllenHo2/08ef71bfb664e7aa73bc8a9b39423d58/raw/25df4d417264da8391847bb45ace2eb21b2c927f/Billionaires.csv%2520-%2520billionaires.csv%2520(1).csv")
  .then(function(data) {



    var sequentialScale = d3.scaleSequential(d3.interpolateRainbow)
    .domain([0,10]);
  
    // Create the SVG element
    var svg = d3.select("body")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);


            
    // Define scales for x and y axes
    var x = d3.scaleBand()
      .domain(data.map(function(d) { return d["company.name"]; }))
      .range([0, w])
      .padding(0.2); // Adjust padding as needed

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d["wealth.worth in billions"] * 1.25; })])
      .nice()
      .range([h, 0]);

    //   console.log(x(d["company.name"]));
    // Create bars
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d) { 
        return x(d["company.name"]);
       })
      .attr("y", function(d) { 
        return y(d["wealth.worth in billions"]) ; 
       })
      .attr("width", x.bandwidth())
      .attr("height",d => (h - y(d["wealth.worth in billions"])))
      .attr("fill", function(d) {
        return "rgb(0, 0, " + Math.round(d["wealth.worth in billions"] * 10) + ")";
    });

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate( 0 , " + h + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      // .style("text-anchor", "end")
      .style("font-size", 10)
      .style("fill", "0");

    var yAxis = d3.axisLeft()
                  .scale(y)
    svg.append("g")
    .attr("class", "axis")
    .call(yAxis);


    var legendSequential = d3.legendColor()
    .shapeWidth(30)
    .cells(10)
    .orient("horizontal")
    .scale(sequentialScale) 

  svg.select(".legendSequential")
  .call(legendSequential);

  })












