async function draw() {
  // data
  const data = await d3.json("data.json");
  //   console.log(data);
  const xAccessor = (d) => {
    return d.currently.humidity;
  };

  const yAccessor = (d) => {
    return d.currently.apparentTemperature;
  };
  //   dimensions
  let dimensions = {
    width: 800,
    height: 800,
    margin: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    },
  };

  dimensions.ctrWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.ctrHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
  // Draw image
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const ctr = svg
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.margin.left},${dimensions.margin.top})`
    );
  // Scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .rangeRound([0, dimensions.ctrWidth])
    .nice()
    .clamp(true);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .rangeRound([dimensions.ctrHeight, 0])
    .nice()
    .clamp(true);
  // Draw Circles
  ctr
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => xScale(xAccessor(d)))
    .attr("cy", (d) => yScale(yAccessor(d)))
    .attr("r", 5)
    .attr("fill", "red")
    .attr("data-temp", yAccessor);

  // Create x and y axes
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(5)
    .tickFormat((d) => d * 100 + "%");
  // .tickVlalues([0.5, 0.8, 0.1]);
  const xAxisGroup = ctr
    .append("g")
    .call(xAxis)
    .style("transform", `translateY(${dimensions.ctrHeight}px)`)
    .classed("axis", true);
  xAxisGroup
    .append("text")
    .attr("x", dimensions.ctrWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .text("Humaditiy");
  const yAxis = d3.axisLeft(yScale);
  const yAxisGroup = ctr.append("g").call(yAxis).classed("axis", true);
  yAxisGroup
    .append("text")
    .attr("x", -dimensions.ctrHeight / 2)
    .attr("y", -dimensions.margin.left + 15)
    .attr("fill", "black")
    .html("Temperature &deg; F")
    .style("transform", "rotate(270deg)")
    .style("text-anchor", "middle");
//   xAxisGroup.selectAll("path,line").remove();
  //   ctr.append("circle").attr("r", 15);
}

draw();
