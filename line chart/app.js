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
    .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);

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
    .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);

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

  // Add a clipPath: everything out of this area won't be drawn.
  var clip = ctr
    .append("defs")
    .append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", dimensions.ctrWidth)
    .attr("height", dimensions.ctrHeight)
    .attr("x", 0)
    .attr("y", 0);

  // Add brushing
  var brush = d3
    .brushX() // Add the brush feature using the d3.brush function
    .extent([
      [0, 0],
      [dimensions.width, dimensions.height],
    ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    .on("end", updateChart); // Each time the brush selection changes, trigger the 'updateChart' function

  // Create the area variable: where both the area and the brush take place
  var area = svg.append("g").attr("clip-path", "url(#clip)");

  // Create an area generator
  var areaGenerator1 = d3
    .area()
    .x(function (d) {
      return x(d.date);
    })
    .y0(yScale(0))
    .y1(function (d) {
      return y(d.value);
    });

  // A function that set idleTimeOut to null
  var idleTimeout;
  function idled() {
    idleTimeout = null;
  }

  // A function that update the chart for given boundaries
  function updateChart() {
    // What are the selected boundaries?
    extent = d3.event.selection;

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if (!extent) {
      if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
      x.domain([4, 8]);
    } else {
      x.domain([x.invert(extent[0]), x.invert(extent[1])]);
      area.select(".brush").call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
    }

    // Update axis and area position
    xAxis.transition().duration(1000).call(d3.axisBottom(x));
    area
      .select(".myArea")
      .transition()
      .duration(1000)
      .attr("d", areaGenerator1);
  }

  // If user double click, reinitialize the chart
  svg.on("dblclick", function () {
    xAxis3.domain(
      d3.extent(data, function (d) {
        return d.date;
      })
    );
    xAxis.transition().call(d3.axisBottom(x));
    area.select(".myArea").transition().attr("d", areaGenerator1);
  });

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
  const formatDate = d3.timeFormat("%d");

  // Accessors
  const xAccessor = (d) => parseDate(d.Date);
  const yAccessor = (d) => parseInt(d.Step_Count);

  // Dimensions
  const dimensions = {
    width: 680,
    height: 331,
    margins: 45,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;

  // Draw SVG
  const svg = d3
    .select("#chart4")
    .append("svg")
    .attr("class", "steps-chart")
    .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);

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
    .nice();

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
    .attr("stroke-width", 3);

  // Draw grid lines
  const oneWeekDates = data4.slice(0, 7).map((d) => xAccessor(d));
  ctr
    .selectAll(".grid-line")
    .data(oneWeekDates)
    .enter()
    .append("line")
    .attr("class", "grid-line")
    .attr("x1", (d) => xScale(d))
    .attr("x2", (d) => xScale(d))
    .attr("y1", 0)
    .attr("y2", dimensions.ctrHeight)
    .attr("stroke", "lightgrey")
    .attr("stroke-dasharray", "4,4");

  // Axes
  const xAxis = d3
    .axisBottom(xScale)
    .tickValues(oneWeekDates)
    .tickFormat(formatDate);

  const yAxis = d3.axisLeft(yScale);

  ctr
    .append("g")
    .attr("transform", `translate(0, ${dimensions.ctrHeight})`)
    .attr("dy", "70px")
    .call(xAxis);

  // Style the axis text
  ctr
    .selectAll(".tick text")
    .style("fill", "black")
    .style("font-size", "24px")
    .style("opacity", 0.5);

  // Remove y-axis domain line
  ctr.selectAll(".domain").remove();
  ctr.selectAll(".tick line").remove();

  // ctr.append("g")
  //     .call(yAxis);

  // Tooltip
  const tooltip = d3.select("#tooltip4");

  // Tooltip dot
  const tooltipDot = ctr
    .append("circle")
    .attr("class", "tooltip-dot")
    .attr("r", 10)
    .attr("fill", "#314CFF")
    .attr("stroke", "#FFFFFF")
    .attr("stroke-width", 6)
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
    const stock = data4[index - 1];

    tooltipDot
      .style("opacity", 1)
      .attr("cx", xScale(xAccessor(stock)))
      .attr("cy", yScale(yAccessor(stock)))
      .raise();

    tooltip
      .style("display", "block")
      .style("top", `${yScale(yAccessor(stock)) + 60}px`)
      .style("left", `${xScale(xAccessor(stock))}px`)
      .html(`Steps: ${yAccessor(stock)}`);
  }
}

drawStepsChart();

// ------------------product chart4
async function productChart() {
  // Sample data for Product A and Product B
  const productAData = [
    { group: "11", value: 10 },
    { group: "12", value: 5 },
    { group: "13", value: 20 },
    { group: "14", value: 35 },
    { group: "15", value: 27 },
  ];

  const productBData = [
    { group: "11", value: 8 },
    { group: "12", value: 20 },
    { group: "13", value: 35 },
    { group: "14", value: 25 },
    { group: "15", value: 10 },
  ];

  // Define dimensions
  const dimensions = {
    width: 680,
    height: 331,
    margins: 25,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;

  // Create SVG
  const svg = d3
    .select("#chart5")
    .append("svg")
    .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
    .append("g")
    .attr("transform", `translate(80, 0)`);

  // Combine data
  const data = [
    ...productAData.map((d) => ({ ...d, product: "Product A" })),
    ...productBData.map((d) => ({ ...d, product: "Product B" })),
  ];

  // Define X scale
  const x0 = d3
    .scaleBand()
    .domain(data.map((d) => d.group))
    .rangeRound([0, dimensions.ctrWidth])
    .paddingInner(0.1);

  // Define X1 scale (for each category within a group)
  const x1 = d3
    .scaleBand()
    .domain(["Product A", "Product B"])
    .range([0, x0.bandwidth()]);

  // Define Y scale
  const y = d3
    .scaleLinear()
    .domain([0, 50])
    .nice()
    .rangeRound([dimensions.ctrHeight, 0]);

  // Draw bars
  svg
    .selectAll("g")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => x0(d.group) + (d.product === "Product A" ? 0 : 12))
    .attr("y", (d) => y(d.value))
    .attr("width", 12)
    .attr("height", (d) => dimensions.ctrHeight - y(d.value))
    .attr("fill", (d) => (d.product === "Product A" ? "#3A4DE9" : "#FF955F"))
    .attr("rx", 6)
    .attr("ry", 6);

  svg
    .append("g")
    .attr("transform", `translate(-40, ${dimensions.ctrHeight})`)
    .call(d3.axisBottom(x0))

    .selectAll(".tick text")
    .attr("dy", "40px")
    .style("opacity", 0.5)
    .style("font-size", "28px");

  svg.selectAll(".domain").remove();
  svg.selectAll(".tick line").remove();

  svg
    .append("g")
    .attr("transform", `translate(-35, 0)`)
    .call(
      d3
        .axisLeft(y)
        .ticks(3)
        .tickSize(-dimensions.ctrWidth)
        .tickFormat((d) => "$" + d)
    )
    .selectAll(".tick text")
    .style("font-size", "24px");
  svg.selectAll(".domain").remove();

  // Draw grid lines
  svg
    .selectAll(".tick line")
    .attr("stroke-opacity", 0.3)
    .attr("stroke-dasharray", "4 4");
}

productChart();
