
async function draw2() {
  // Data
  const dataset = await d3.csv("data.csv");

  // converting time and string
  const parseDate = d3.timeParse("%Y-%m-%d");
  const formatDay = d3.timeFormat("%a"); // Format: "Mon"
  const formatDate = d3.timeFormat("%d"); // Format: "11"
  const xAccessor = (d) => parseDate(d.date);
  const yAccessor = (d) => parseInt(d.close);

  // Dimensions
  let dimensions = {
    width: 600,
    height: 450,
    margins: 40,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;

  // Draw Image
  const svg = d3
    .select("#chart2")
    .append("svg")
    .attr("class", "svg2")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const ctr = svg
    .append("g") // <g>
    .attr(
      "transform",
      `translate(${dimensions.margins}, ${dimensions.margins})`
    );

  const tooltip = d3.select("#tooltip2");
  // console.log(tooltip);
  const tooltipDot = ctr
    .append("circle")
    // console.log(tooltipDot)
    .attr("class", "circle")
    .attr("r", 5)
    .attr("fill", "#314CFF")
    .attr("stroke", "#FFFFFF")
    .attr("stroke-width", 3)
    .style("opacity", 0)
    .style("pointer-events", "none");

  // Scales
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.ctrHeight, 0])
    .nice();

  const xScale = d3
    .scaleUtc()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.ctrWidth]);
  // .nice()

  // console.log(xScale(xAccessor(dataset[0])),dataset[0])

  // line generator
  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)))
    .curve(d3.curveBasis);
  // AreaGenerator To Color
  const areaGenerator = d3
    .area()
    .x((d) => xScale(xAccessor(d)))
    .y0(dimensions.ctrHeight)
    .y1((d) => yScale(yAccessor(d)))
    .curve(d3.curveBasis);
  // Create linear gradient for the area
  const areaGradient = ctr
    .append("linearGradient")
    .attr("id", "areaGradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", dimensions.ctrHeight);

  areaGradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#314CFF");

  areaGradient
    .append("stop")
    .attr("offset", "93.23%")
    .attr("stop-color", "rgba(217, 217, 217, 0)");
  ctr
    .append("path")
    .datum(dataset)
    .attr("d", areaGenerator)
    .attr("fill", "url(#areaGradient)");

  ctr
    .append("path")
    .datum(dataset)
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "#314CFF")
    .attr("stroke-width", 3);

  const gradient = ctr
    .append("linearGradient")
    .attr("id", "gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", yScale(yAccessor(dataset[0])))
    .attr("x2", 0)
    .attr("y2", dimensions.ctrHeight);

  gradient.append("stop").attr("offset", "0%").attr("stop-color", "#314CFF");
  gradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#FFFFFF")
    .attr("stop-opacity", 0.1);

  console.log(lineGenerator(dataset), "data");
  // Creating Axis
  const yAxis = d3.axisLeft(yScale).tickFormat((d) => `$${d}`);

  ctr.append("g");

  ctr.select(".domain").remove();
  ctr.selectAll(".tick line").remove();

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(5)
    .tickFormat((date) => {
      const day = formatDay(date);
      const dayOfMonth = formatDate(date);
      return day;
    });

  const gXAxis = ctr
    .append("g")
    // .style("transform", `translateY(${dimensions.ctrHeight}px)`)
    .call(xAxis);

  gXAxis
    .selectAll(".tick text")
    .attr("dy", "-1.25em")
    .style("text-anchor", "middle")
    .style("fill", "#000000")
    .style("font-size", "22px")
    .style("font-weight", "500")
    // .style('line ')
    .style("opacity", 0.5);

  // Append date underneath the day
  gXAxis
    .selectAll(".tick")
    .append("text")
    .attr("x", 0)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text((date) => formatDate(date))
    .style("fill", "#000000")
    .style("font-size", "22px")
    .style("font-weight", "500")
    .style("opacity", 0.8);

  gXAxis.select(".domain").remove();
  gXAxis.selectAll(".tick line").remove();

  // .selectAll(".tick line").remove()
  // .select(".domain").remove();

  // Add grid lines for the ticks shown on the x-axis
  gXAxis
    .selectAll(".tick")
    .append("line")
    .attr("class", "grid-line")
    .attr("x1", (d) => xScale(xAccessor(d)))
    .attr("x2", (d) => xScale(xAccessor(d)))
    .attr("y1", 60)
    .attr("y2", dimensions.ctrHeight)
    .attr("stroke", "lightgrey")
    .attr("stroke-dasharray", "4,4");

  // gXAxis.selectAll(".tick")
  // .append("line")
  // .attr("class", "grid-line")
  // .attr("x1", 0)
  // .attr("x2", 0)
  // .attr("y1", 0)
  // .attr("y2", dimensions.ctrHeight)
  // .attr("stroke", "red")
  // .attr("stroke-dasharray", "3,3");
  ctr
    .append("rect")
    .attr("width", dimensions.ctrWidth)
    .attr("height", dimensions.ctrHeight)
    .style("opacity", 0)
    .on("touchmouse mousemove", function (event) {
      const mousePosition = d3.pointer(event, this);
      // console.log(mousePosition,"position")
      const date = xScale.invert(mousePosition[0]);

      // custom bisector

      const bisector = d3.bisector(xAccessor).left;
      const index = bisector(dataset, date);
      const stock = dataset[index - 1];

      // update the tooltipDot image  and showing
      tooltipDot
        .style("opacity", 1)
        .attr("cx", xScale(xAccessor(stock)))
        .attr("cy", yScale(yAccessor(stock)))
        .raise();

      tooltip
        .style("display", "flex")
        .style("top", yScale(yAccessor(stock)) - 20 + "px")
        .style("left", xScale(xAccessor(stock)) + "px");

      tooltip.select(".price2").text(`$${yAccessor(stock)}`);

      const dateFormatter = d3.timeFormat("%B %-d, %Y");

      tooltip
        .select(".date2")
        .text(`${dateFormatter(xAccessor(stock))}`)
        .style("opacity", 0.7)
        .on("mouseleave", function (event) {
          tooltipDot.style("opacity", 0);

          tooltip.style("display", "none");
        });
    });
}

draw2();
