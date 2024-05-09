// set the dimensions and margins of the graph
const width = 450,
  height = 450,
  margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
const svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width / 2},${height / 2})`);

// Create dummy data
const data = { a: 15, b: 20, c: 65 };

// set the color scale
const color = d3
  .scaleOrdinal()
  .domain(["a", "b", "c"])
  .range(["#FFD1A7", "#FF9E69", "#2B4DED"]);

// Compute the position of each group on the pie:
const pie = d3
  .pie()
  .sort(null) // Do not sort group by size
  .value((d) => d[1]);
const data_ready = pie(Object.entries(data));

// The arc generator
const arc = d3
  .arc()
  .innerRadius(radius * 0.45) // This is the size of the donut hole
  .outerRadius(radius * 0.8);

// Another arc that won't be drawn. Just for labels positioning
const outerArc = d3
  .arc()
  .innerRadius(radius * 0.7)
  .outerRadius(radius * 1.1);

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll("allSlices")
  .data(data_ready)
  .join("path")
  .attr("d", arc)
  .attr("fill", (d) => color(d.data[1]));
//   .attr("stroke", "white")
//   .style("stroke-width", "2px")
//   .style("opacity", 0.7)

// Define drop shadow filter
svg
  .append("defs")
  .append("filter")
  .attr("id", "drop-shadow")
  .append("feDropShadow")
  .attr("dx", 0)
  .attr("dy", 1)
  .attr("stdDeviation", 4)
  .attr("flood-color", "#0000001A");

// Add the svg circles between chart and labels:
svg
  .selectAll("allCircles")
  .data(data_ready)
  .join("circle")
  .attr("cx", (d) => outerArc.centroid(d)[0]) // Set the x position based on outer arc centroid
  .attr("cy", (d) => outerArc.centroid(d)[1]) // Set the y position based on outer arc centroid
  .attr("r", radius * 0.3) // Set radius of circle
  .attr("fill", "#fff") // Set fill color
  .style("filter", "url(#drop-shadow)") // Apply drop shadow
  .on("mouseover", function (d) {
    // Show tooltip or highlight circle on mouseover if needed
  })
  .on("mouseout", function (d) {
    // Hide tooltip or reset circle on mouseout if needed
  });

// Add text inside circles:
svg
  .selectAll("allText")
  .data(data_ready)
  .join("text")
  .text((d) => `${d.data[1]}%`) // Display data in text format
  .attr("x", (d) => outerArc.centroid(d)[0]) // Set x position based on outer arc centroid
  .attr("y", (d) => outerArc.centroid(d)[1]) // Set y position based on outer arc centroid
  .style("font-size", "30px") 
  .style("font-weight","600")
  .attr("text-anchor", "middle") // Set text anchor to middle
  .attr("alignment-baseline", "middle") // Set alignment baseline to middle
  .attr("fill", "#000") // Set text color
  
