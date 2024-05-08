// async function draw() {
//   // Data
//   const dataset = await d3.csv("data.csv");

//   // converting time and string
//   const parseDate = d3.timeParse("%Y-%m-%d");
//   const xAccessor = (d) => parseDate(d.date);
//   const yAccessor = (d) => parseInt(d.close);

//   // Dimensions
//   let dimensions = {
//     width: 1000,
//     height: 500,
//     margins: 50,
//   };

//   dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
//   dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;

//   // Draw Image
//   const svg = d3
//     .select("#chart")
//     .append("svg")
//     .attr("width", dimensions.width)
//     .attr("height", dimensions.height);

//   const ctr = svg
//     .append("g") // <g>
//     .attr(
//       "transform",
//       `translate(${dimensions.margins}, ${dimensions.margins})`
//     );

//   const tooltip = d3.select("#tooltip");
//   // console.log(tooltip);
//   const tooltipDot = ctr
//     .append("circle")
//     // console.log(tooltipDot)
//     .attr("class", "circle")
//     .attr("r", 5)
//     .attr("fill", "#314CFF")
//     .attr("stroke", "#FFFFFF")
//     .attr("stroke-width", 3)
//     .style("opacity", 0)
//     .style("pointer-events", "none");

//   // Scales
//   const yScale = d3
//     .scaleLinear()
//     .domain(d3.extent(dataset, yAccessor))
//     .range([dimensions.ctrHeight, 0])
//     .nice();

//   const xScale = d3
//     .scaleUtc()
//     .domain(d3.extent(dataset, xAccessor))
//     .range([0, dimensions.ctrWidth]);
//   // .nice()

//   // console.log(xScale(xAccessor(dataset[0])),dataset[0])

//   // line generator
//   const lineGenerator = d3
//     .line()
//     .x((d) => xScale(xAccessor(d)))
//     .y((d) => yScale(yAccessor(d)))
//     .curve(d3.curveBasis);
//   // AreaGenerator To Color
//   const areaGenerator = d3
//     .area()
//     .x((d) => xScale(xAccessor(d)))
//     .y0(dimensions.ctrHeight)
//     .y1((d) => yScale(yAccessor(d)))
//     .curve(d3.curveBasis);
//   // Create linear gradient for the area
//   const areaGradient = ctr
//     .append("linearGradient")
//     .attr("id", "areaGradient")
//     .attr("gradientUnits", "userSpaceOnUse")
//     .attr("x1", 0)
//     .attr("y1", 0)
//     .attr("x2", 0)
//     .attr("y2", dimensions.ctrHeight);

//   areaGradient
//     .append("stop")
//     .attr("offset", "0%")
//     .attr("stop-color", "#314CFF");

//   areaGradient
//     .append("stop")
//     .attr("offset", "93.23%")
//     .attr("stop-color", "rgba(217, 217, 217, 0)");
//   ctr
//     .append("path")
//     .datum(dataset)
//     .attr("d", areaGenerator)
//     .attr("fill", "url(#areaGradient)");

//   ctr
//     .append("path")
//     .datum(dataset)
//     .attr("d", lineGenerator)
//     .attr("fill", "none")
//     .attr("stroke", "#314CFF")
//     .attr("stroke-width", 3);

//   const gradient = ctr
//     .append("linearGradient")
//     .attr("id", "gradient")
//     .attr("gradientUnits", "userSpaceOnUse")
//     .attr("x1", 0)
//     .attr("y1", yScale(yAccessor(dataset[0])))
//     .attr("x2", 0)
//     .attr("y2", dimensions.ctrHeight);

//   gradient.append("stop").attr("offset", "0%").attr("stop-color", "#314CFF");
//   gradient
//     .append("stop")
//     .attr("offset", "100%")
//     .attr("stop-color", "#FFFFFF")
//     .attr("stop-opacity", 0.1);

//   console.log(lineGenerator(dataset), "data");
//   // Creating Axis
//   const yAxis = d3.axisLeft(yScale).tickFormat((d) => `$${d}`);

//   ctr.append("g");

//   ctr.select(".domain").remove();
//   ctr.selectAll(".tick line").remove()

//   const xAxis = d3.axisBottom(xScale);

//   ctr
//     .append("g")
//     // .style("transform", `translateY(${dimensions.ctrHeight}px)`)
//     .call(xAxis)
//     .selectAll(".tick line").remove()
//     .select(".domain").remove()

//   ctr
//     .append("rect")
//     .attr("width", dimensions.ctrWidth)
//     .attr("height", dimensions.ctrHeight)
//     .style("opacity", 0)
//     .on("touchmouse mousemove", function (event) {
//       const mousePosition = d3.pointer(event, this);
//       // console.log(mousePosition,"position")
//       const date = xScale.invert(mousePosition[0]);

//       // custom bisector

//       const bisector = d3.bisector(xAccessor).left;
//       const index = bisector(dataset, date);
//       const stock = dataset[index - 1];

//       // update the tooltipDot image  and showing
//       tooltipDot
//         .style("opacity", 1)
//         .attr("cx", xScale(xAccessor(stock)))
//         .attr("cy", yScale(yAccessor(stock)))
//         .raise();

//       tooltip
//         .style("display", "block")
//         .style("top", yScale(yAccessor(stock)) - 20 + "px")
//         .style("left", xScale(xAccessor(stock)) + "px");

//       tooltip.select(".price").text(`$${yAccessor(stock)}`);
//       const dateFormatter = d3.timeFormat("%B %-d, %Y");

//       tooltip
//         .select(".date")
//         .text(`${dateFormatter(xAccessor(stock))}`)
//         .on("mouseleave", function (event) {
//           tooltipDot.style("opacity", 0);

//           tooltip.style("display", "none");
//         });
//     });
// }
// draw();

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
  
    // console.log(lineGenerator(dataset), "data");
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
  
  async function draw3() {
    const dataset = await d3.csv("hr.csv");
  
    // Convert string values to integers
    const xAccessor = (d) => +d.Measurement_Number;
    const yAccessor = (d) => +d.HR_Fingertip_Pulse_Oximeter;
  
    // Dimensions
    const dimensions = {
      width: 600,
      height: 290,
      margins: 40,
    };
  
    dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
    dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;
  
    // Draw SVG
    const svg = d3
      .select("#chart3")
      .append("svg")
      .attr("class", "svg3")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);
  
    const ctr = svg
      .append("g")
      .attr(
        "transform",
        `translate(${dimensions.margins}, ${dimensions.margins})`
      );
  
    // Tooltip setup
    const tooltip = d3.select("#tooltip3");
    const tooltipDot = ctr
      .append("circle")
      .attr("class", "circle")
      .attr("r", 10)
      .attr("fill", "#314CFF")
      .attr("stroke", "#FFFFFF")
      .attr("stroke-width", 4)
      .style("opacity", 0)
      .style("pointer-events", "none");
  
    // Scales
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, yAccessor)])
      .range([dimensions.ctrHeight, 0]);
    // .nice();
  
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(dataset, xAccessor), d3.max(dataset, xAccessor)])
      .range([0, dimensions.ctrWidth]);
  
    // Line generator
    const lineGenerator = d3
      .line()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)))
      .curve(d3.curveMonotoneX);
  
    // Area generator
    const areaGenerator = d3
      .area()
      .x((d) => xScale(xAccessor(d)))
      .y0(dimensions.ctrHeight)
      .y1((d) => yScale(yAccessor(d)))
      .curve(d3.curveMonotoneX);
  
    // Gradient setup for area
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
  
    // Draw area
    ctr
      .append("path")
      .datum(dataset)
      .attr("d", areaGenerator)
      .attr("fill", "url(#areaGradient)");
  
    // Draw line
    ctr
      .append("path")
      .datum(dataset)
  
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "#314CFF")
      .transition()
      .duration(3000)
      .attr("stroke-width", 2);
  
    // Gradient setup for line
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
  
    // Axes
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => d);
    const xAxis = d3.axisBottom(xScale).ticks(5);
  
    ctr.selectAll(".tick line").remove();
  
    // Add horizontal grid line
    const horizontalGridLine = ctr
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", dimensions.ctrWidth)
      .attr("y1", dimensions.ctrHeight / 2)
      .attr("y2", dimensions.ctrHeight / 2)
      .attr("stroke", "#AFAFAF")
      .attr("stroke-dasharray", "3,3");
  
    // Interaction
    ctr
      .append("rect")
      .attr("width", dimensions.ctrWidth)
      .attr("height", dimensions.ctrHeight)
      .style("opacity", 0)
      .on("mousemove", showTooltip);
  
    function showTooltip(event) {
      const [mouseX, mouseY] = d3.pointer(event);
      const mouseDate = xScale.invert(mouseX);
  
      // Find the closest data point to the mouse position
      const bisector = d3.bisector((d) => +d.Measurement_Number).left;
      const index = bisector(dataset, mouseDate);
      const dataPoint = dataset[index];
      console.log(dataPoint);
      // Calculate tooltip position
      const tooltipX = xScale(xAccessor(dataPoint));
      const tooltipY = yScale(yAccessor(dataPoint));
  
      // Show tooltip and dot
      tooltipDot
        .style("opacity", 1)
        .attr("cx", tooltipX)
        .attr("cy", tooltipY)
        .raise();
  
      tooltip
        .style("display", "block")
        .style("top", `${tooltipY - 20}px`)
        .style("left", `${tooltipX}px`)
        .raise();
  
      // Update tooltip content
      tooltip.select(".subject3").text(`user number: ${dataPoint.Subject}`);
      tooltip
        .select(".measurment-no")
        .text(`Measurement Number: ${xAccessor(dataPoint)}`);
      tooltip.select(".heartRate").text(`Heart Rate: ${yAccessor(dataPoint)}`);
  
      // Update horizontal grid line position
      horizontalGridLine.attr("y1", tooltipY).attr("y2", tooltipY);
    }
  }
  
  draw3();
  
  async function drawStepsChart() {
    // Load data
    const data4 = await d3.csv("Steps Export_ 3-17-21to9-23-22.csv");
  
    // Parse the date and format the day
    const parseDate = d3.timeParse("%m/%d/%Y");
    const formatDate = d3.timeFormat("%b %d");
  
    // Accessors
    const xAccessor = (d) => parseDate(d.Date);
    const yAccessor = (d) => parseInt(d.Step_Count);
  
    // Dimensions
    const dimensions = {
      width: 600,
      height: 290,
      margins: 40,
    };
  
    dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
    dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;
  
    // Draw SVG
    const svg = d3
      .select("#chart4")
      .append("svg")
      .attr("class", "steps-chart")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);
  
    const ctr = svg
      .append("g")
      .attr(
        "transform",
        `translate(${dimensions.margins}, ${dimensions.margins})`
      );
  
    // Scales
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data4, yAccessor)])
      .range([dimensions.ctrHeight, 0])
      .nice()
  
    const xScale = d3
      .scaleUtc()
      .domain(d3.extent(data4, xAccessor))
      .range([0, dimensions.ctrWidth]);
  
    // Line generator
    const lineGenerator = d3
      .line()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)))
      .curve(d3.curveMonotoneX);
  
      // AreaGenerator To Color
    const areaGenerator = d3
    .area()
    .x((d) => xScale(xAccessor(d)))
    .y0(dimensions.ctrHeight)
    .y1((d) => yScale(yAccessor(d)))
    .curve(d3.curveMonotoneX);
  
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
    .datum(data4)
    .attr("d", areaGenerator)
    .attr("fill", "url(#areaGradient)");
  
  ctr
    .append("path")
    .datum(data4)
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "#314CFF")
    .attr("stroke-width", 3);
  
  const gradient = ctr
    .append("linearGradient")
    .attr("id", "gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", yScale(yAccessor(data4)))
    .attr("x2", 0)
    .attr("y2", dimensions.ctrHeight);
  
  gradient.append("stop").attr("offset", "0%").attr("stop-color", "#314CFF");
  gradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#FFFFFF")
    .attr("stop-opacity", 0.1);
  
  
    // Draw line
    ctr
      .append("path")
      .datum(data4)
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "#314CFF")
      .attr("stroke-width", 4);
  
    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(8).tickFormat(formatDate);
  
    const yAxis = d3.axisLeft(yScale);
  
    ctr
      .append("g")
      .attr("transform", `translate(0, ${dimensions.ctrHeight})`)
      .call(xAxis);
  
    ctr.append("g").call(yAxis);
  
    // Tooltip
    const tooltip = d3.select("#tooltip");
  
    // Tooltip dot
    const tooltipDot = ctr
      .append("circle")
      .attr("class", "tooltip-dot")
      .attr("r", 5)
      .attr("fill", "#314CFF")
      .attr("stroke", "#FFFFFF")
      .attr("stroke-width", 2)
      .style("opacity", 0)
      .style("pointer-events", "none");
  
    // Interaction
    ctr
      .append("rect")
      .attr("width", dimensions.ctrWidth)
      .attr("height", dimensions.ctrHeight)
      .style("opacity", 0)
      .on("mousemove", showTooltip)
      .on("touchmove", showTooltip);
  
    function showTooltip(event) {
      const [mouseX, mouseY] = d3.pointer(event);
      const date = xScale.invert(mouseX);
      const bisector = d3.bisector(xAccessor).left;
      const index = bisector(data4, date);
      const stock = data4[index];
  
      tooltipDot
        .style("opacity", 1)
        .attr("cx", xScale(xAccessor(stock)))
        .attr("cy", yScale(yAccessor(stock)))
        .raise();
  
      tooltip
        .style("display", "block")
        .style("top", `${yScale(yAccessor(stock)) - 20}px`)
        .style("left", `${xScale(xAccessor(stock))}px`)
        .html(
          `Date: ${formatDate(xAccessor(stock))}<br>Step Count: ${yAccessor(
            stock
          )}`
        );
    }
  }
  
  drawStepsChart();
  