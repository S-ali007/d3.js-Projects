const data = [
  { yAxisvalue: 20, xAxisvalue: 10, color: "#3A4DE9" },
  { yAxisvalue: 40, xAxisvalue: 11, color: "#3A4DE9" },
  { yAxisvalue: 20, xAxisvalue: 12, color: "#3A4DE9" },
  { yAxisvalue: 30, xAxisvalue: 13, color: "#3A4DE9" },
  { yAxisvalue: 25, xAxisvalue: 14, color: "#FB975B" },
];



// SVG dimensions
const width = 680;
const height = 320;
const margin = { top: 10, right: 10, bottom: 40, left: 10 };
// const barWidth = 12;

// Create SVG element
const svg = d3.select("#bar-chart").attr("width", width);
// Extract min and max xAxisvalue
const xMin = d3.min(data, (d) => d.xAxisvalue);
const xMax = d3.max(data, (d) => d.xAxisvalue);

// Create x scale
const xScale = d3
  .scaleBand()
  .domain(d3.range(xMin, xMax + 1))
  .range([margin.left, width - margin.right])
  .padding(0.9);

// Create y scale
const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d.yAxisvalue)])
  .range([height - margin.bottom, margin.top]);

// Create bars
svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d) => xScale(d.xAxisvalue))
  .attr("y", (d) => yScale(d.yAxisvalue))
  .attr("width", "12px")
  .attr("height", (d) => height - margin.bottom - yScale(d.yAxisvalue))
  .attr("rx", 5)
  .attr("ry", 5)
  .style("fill", (d) => d.color);

// Add x-axis
const xAxis = d3.axisBottom(xScale);

svg
  .append("g")
  .attr("transform", `translate(0, ${height - margin.top})`)
  .call(xAxis);
// .call(g=>g.select('.domain').remove());

// Style the axis text
svg
  .selectAll("text")
  .style("fill", "#000000")
  .style("font-size", "28px")
  .style("opacity", 0.5);

// Remove y-axis lines and ticks
svg.select(".domain").remove();
svg.selectAll(".tick line").remove();

svg
  .selectAll("line.horizontal-grid")
  .data(yScale.ticks(2))
  .enter()
  .append("line")
  .attr("class", "horizontal-grid")
  .attr("x1", margin.left)
  .attr("y1", function (d) {
    return yScale(d);
  })
  .attr("x2", width - margin.right)
  .attr("y2", function (d) {
    return yScale(d);
  })

  .style("stroke", "gray")
  .style("stroke-width", 0.7)
  .style("stroke-dasharray", "5")
  .style("opacity", 0.5);

// --------------------------------------------------------------------------chart2
const data2 = [
  { yAxisvalue: 20, xAxisvalue: "M", color: "#3A4DE9" },
  { yAxisvalue: 30, xAxisvalue: "T", color: "#3A4DE9" },
  { yAxisvalue: 40, xAxisvalue: "W", color: "#3A4DE9" },
  { yAxisvalue: 50, xAxisvalue: "T", color: "#3A4DE9" },
  { yAxisvalue: 25, xAxisvalue: "F", color: "#FB975B" },
  { yAxisvalue: 55, xAxisvalue: "S", color: "#E9ECF1" },
  { yAxisvalue: 25, xAxisvalue: "S", color: "#E9ECF1" },
  { yAxisvalue: 25, xAxisvalue: "S", color: "#E9ECF1" },
  { yAxisvalue: 25, xAxisvalue: "S", color: "#E9ECF1" },
  { yAxisvalue: 25, xAxisvalue: "S", color: "#E9ECF1" },
];

// SVG dimensions
const width2 = 680;
const height2 = 320;
const margin2 = { top: 10, right: 10, bottom: 40, left: 10 };

// Create SVG element
const svg2 = d3.select("#bar-chart2").attr("width", width2);

// Extract unique xAxisvalues
const xValues = data2.map((d) => d.xAxisvalue);

const xScale2 = d3
  .scaleBand()
  .domain(xValues)
  .range([margin2.left, width2 - margin2.right])
  .padding(0.7)

const yScale2 = d3
  .scaleLinear()
  .domain([0, d3.max(data2, (d) => d.yAxisvalue)])
  .range([height2 - margin2.bottom, margin2.top]);


svg2
  .selectAll("rect")
  .data(data2)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d) => xScale2(d.xAxisvalue))
  .attr("y", (d) => yScale2(d.yAxisvalue))
  .attr("width", "35px") 
  .attr("height", (d) => height2 - margin2.bottom - yScale2(d.yAxisvalue))
  .attr("rx", 18)
  .attr("ry", 18)
  .style("fill", (d) => d.color);

// Add x-axis
const xAxis2 = d3.axisBottom(xScale2);

svg2
  .append("g")
  .attr("transform", `translate(0, ${height2 - margin2.bottom})`)
  .call(xAxis2)
  .selectAll("text") 
  .style("fill", "#000000")
  .style("font-size","28px")
  .style("opacity", 0.5)
  .attr("dy", "42px") 
  // .attr("transform", "rotate(-45)"); 

// Remove y-axis lines and ticks
svg2.select(".domain").remove();
svg2.selectAll(".tick line").remove();

