const data1 = [
  { yAxisvalue: 10, xAxisvalue: 10, color: "#3A4DE9" },
  { yAxisvalue: 30, xAxisvalue: 11, color: "#3A4DE9" },
  { yAxisvalue: 20, xAxisvalue: 12, color: "#3A4DE9" },
  { yAxisvalue: 40, xAxisvalue: 13, color: "#3A4DE9" },
  { yAxisvalue: 35, xAxisvalue: 14, color: "#FB975B" },
];
const datanew = [
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
const svg = d3.select("#bar-chart").attr("viewBox", `0 0 ${width} ${height}`);

// Extract min and max xAxisvalue
const xMin = d3.min(data1, (d) => d.xAxisvalue);
const xMax = d3.max(data1, (d) => d.xAxisvalue);

// Create x scale
const xScale = d3
  .scaleBand()
  .domain(d3.range(xMin, xMax + 1))
  .range([margin.left, width - margin.right])
  .padding(0.9);

// Create y scale
const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data1, (d) => d.yAxisvalue)])
  .range([height - margin.bottom, margin.top]);

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

function update(data) {
  // Create bars
  const bars = svg.selectAll("rect").data(data);
  bars
    .enter()
    .append("rect")
    .merge(bars)
    .transition()
    .duration(1000)
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.xAxisvalue))
    .attr("y", (d) => yScale(d.yAxisvalue))
    .attr("width", "12px")
    .attr("height", (d) => height - margin.bottom - yScale(d.yAxisvalue))
    .attr("rx", 5)
    .attr("ry", 5)
    .style("fill", (d) => d.color);
}

update(data1);

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
const svg2 = d3
  .select("#bar-chart2")
  .attr("viewBox", `0 0 ${width2} ${height2}`);

// Extract unique xAxisvalues
const xValues2 = data2.map((d) => d.xAxisvalue);

const xScale2 = d3
  .scaleBand()
  .domain(xValues2)
  .range([margin2.left, width2 - margin2.right])
  .padding(0.7);

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
  .style("fill", (d) => d.color)

  // no bar at the beginning thus:
  .attr("height", function (d) {
    return height2 - yScale2(0);
  }) // always equal to 0
  .attr("y", function (d) {
    return yScale2(0);
  });

// Animation
svg2
  .selectAll("rect")
  .transition()
  .duration(1000)
  .attr("y", function (d) {
    return yScale2(d.yAxisvalue);
  })
  .attr("height", function (d) {
    return height2 - yScale2(d.yAxisvalue);
  })
  .delay(function (d, i) {
    console.log(i);
    return i * 400;
  });

// Add x-axis
const xAxis2 = d3.axisBottom(xScale2);

svg2
  .append("g")
  .attr("transform", `translate(0, ${height2 - margin2.bottom})`)
  .call(xAxis2)
  .selectAll("text")
  .style("fill", "#000000")
  .style("font-size", "28px")
  .style("opacity", 0.5)
  .attr("dy", "90px");
// .attr("transform", "rotate(-45)");

// Remove y-axis lines and ticks
svg2.select(".domain").remove();
svg2.selectAll(".tick line").remove();

// -----------------------------------------chart 3
const data3 = [
  { yAxisvalue: "$80", xAxisvalue: 10, color: "#3A4DE9" },
  { yAxisvalue: "$65", xAxisvalue: 11, color: "#3A4DE9" },
  { yAxisvalue: "$60", xAxisvalue: 12, color: "#3A4DE9" },
  { yAxisvalue: "$55", xAxisvalue: 13, color: "#3A4DE9" },
  { yAxisvalue: "$50", xAxisvalue: 14, color: "#3A4DE9" },
];

// SVG dimensions
const width3 = 680;
const height3 = 360;
const margin3 = { top: 10, right: 10, bottom: 60, left: 50 };

// Create SVG element
const svg3 = d3
  .select("#bar-chart3")
  .attr("viewBox", `0 0 ${width3} ${height3}`);
// .attr("height", height3);

// Create x scale
const xScale3 = d3
  .scaleBand()
  .domain(data3.map((d) => d.xAxisvalue))
  .range([margin3.left, width3 - margin3.right])
  .padding(0.9);

// Create y scale
const yScale3 = d3
  .scaleLinear()
  .domain([40, d3.max(data3, (d) => parseFloat(d.yAxisvalue.replace("$", "")))])
  .nice()
  .range([height3 - margin3.bottom, margin3.top]);

// Create bars
svg3
  .selectAll("rect")
  .data(data3)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d) => xScale3(d.xAxisvalue))
  .attr("y", (d) => yScale3(parseFloat(d.yAxisvalue.replace("$", ""))))
  .attr("width", "12px")
  .attr(
    "height",
    (d) =>
      height3 -
      margin3.bottom -
      yScale3(parseFloat(d.yAxisvalue.replace("$", "")))
  )
  .attr("rx", 8)
  .attr("ry", 8)
  .attr("fill", (d) => d.color);

// Add x-axis
const xAxis3 = d3.axisBottom(xScale3);
svg3
  .append("g")
  .attr("transform", `translate(0, ${height3 - margin3.bottom})`)
  .call(xAxis3)
  .selectAll(".tick text")
  .attr("dy", "40px")
  .style("opacity", 0.5)
  .style("font-size", "28px"); // Set font size for x-axis text

// Add y-axis
const yAxis3 = d3
  .axisLeft(yScale3)
  .ticks(2) // Set the number of ticks
  .tickFormat(d3.format("$,.0f")); // Format the tick values
svg3
  .append("g")
  .attr("transform", `translate(${margin3.left}, 0)`)
  .call(yAxis3)
  .selectAll(".tick line")
  .remove(); // Remove y-axis tick lines

// Add horizontal gridlines
const gridlines = svg3
  .selectAll("line.horizontal-grid")
  .data([40, 80, 60]) // Specify the values where you want to show gridlines
  .enter()
  .append("line")
  .attr("class", "horizontal-grid")
  .attr("x1", margin3.left)
  .attr("y1", (d) => yScale3(d))
  .attr("x2", width3 - margin3.right)
  .attr("y2", (d) => yScale3(d))
  .style("stroke", "gray")
  .style("stroke-width", 0.7)
  .style("stroke-dasharray", "5")
  .style("opacity", 0.5);

// Style the axis text
svg3
  .selectAll(".tick text")
  .style("fill", "black")

  .style("font-size", "24px"); // Set font size for y-axis text

// Remove y-axis domain line
svg3.selectAll(".domain").remove();
svg3.selectAll(".tick line").remove();

// --------------------------------------------------------------------------chart4
const data4 = [
  { yAxisvalue: 20, xAxisvalue: "Mon", color: "#E9ECF3" },
  { yAxisvalue: 30, xAxisvalue: "Tu", color: "#394CFF" },
  { yAxisvalue: 40, xAxisvalue: "Wed", color: "#E9ECF3" },
  { yAxisvalue: 50, xAxisvalue: "Thu", color: "#394CFF" },
  { yAxisvalue: 25, xAxisvalue: "Fri", color: "#394CFF" },
  { yAxisvalue: 55, xAxisvalue: "Sat", color: "#E9ECF3" },
  { yAxisvalue: 25, xAxisvalue: "Today", color: "#E9ECF3" },
];

// SVG dimensions
const width4 = 680;
const height4 = 320;
const margin4 = { top: 10, right: 10, bottom: 40, left: 10 };

// Create SVG element
const svg4 = d3
  .select("#bar-chart4")
  .attr("viewBox", `0 0 ${width4} ${height4}`);

// Extract unique xAxisvalues
const xValues4 = data4.map((d) => d.xAxisvalue);

const xScale4 = d3
  .scaleBand()
  .domain(xValues4)
  .range([margin4.left, width4 - margin4.right])
  .padding(0.3);

const yScale4 = d3
  .scaleLinear()
  .domain([0, d3.max(data4, (d) => d.yAxisvalue)])
  .range([height4 - margin4.bottom, margin4.top]);

svg4
  .selectAll("rect")
  .data(data4)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d) => xScale4(d.xAxisvalue))
  // .attr("y", (d) => yScale4(d.yAxisvalue))
  .attr("width", "68px")
  // .attr("height", (d) => height4 - margin4.bottom - yScale4(d.yAxisvalue))
  .attr("rx", 18)
  .attr("ry", 18)
  .style("fill", (d) => d.color)
  // no bar at the beginning thus:
  .attr("height", function (d) {
    return height4 - margin4.bottom - yScale4(0);
  }) // always equal to 0
  .attr("y", function (d) {
    return yScale4(0);
  });

// Animation
svg4
  .selectAll("rect")
  .transition()
  .duration(1200)
  .attr("y", function (d) {
    return yScale4(d.yAxisvalue);
  })
  .attr("height", function (d) {
    return height4 - margin4.bottom - yScale4(d.yAxisvalue);
  })
  .delay(function (d, i) {
    console.log(i);
    return i * 600;
  });

// Add x-axis
const xAxis4 = d3.axisBottom(xScale4);

svg4
  .append("g")
  .attr("transform", `translate(0, ${height4 - margin4.bottom})`)
  .call(xAxis4)
  .selectAll("text")
  .style("fill", "#000000")
  .style("font-size", "28px")
  .style("font-weight", "500")
  .style("opacity", 0.5)
  .attr("dy", "42px");
// .attr("transform", "rotate(-45)");

// Remove y-axis lines and ticks
svg4.select(".domain").remove();
svg4.selectAll(".tick line").remove();

// -----------------------------------------chart 5
const data5 = [
  { yAxisvalue: "$55", xAxisvalue: 10, color: "#E9ECF1" },
  { yAxisvalue: "$65", xAxisvalue: 11, color: "#E9ECF1" },
  { yAxisvalue: "$75", xAxisvalue: 12, color: "#E9ECF1" },
  { yAxisvalue: "$65", xAxisvalue: 13, color: "#E9ECF1" },
  { yAxisvalue: "$85", xAxisvalue: 14, color: "#3A4DE9" },
  { yAxisvalue: "$75", xAxisvalue: 15, color: "#E9ECF1" },
];

// SVG dimensions
const width5 = 680;
const height5 = 350;
const margin5 = { top: 10, right: 10, bottom: 60, left: 50 };

// Create SVG element
const svg5 = d3
  .select("#bar-chart5")
  .attr("width", width5)
  .attr("height", height3);

// Create x scale
const xScale5 = d3
  .scaleBand()
  .domain(data5.map((d) => d.xAxisvalue))
  .range([margin5.left, width5 - margin5.right])
  .padding(0.9);

// Create y scale
const yScale5 = d3
  .scaleLinear()
  .domain([40, d3.max(data5, (d) => parseFloat(d.yAxisvalue.replace("$", "")))])
  .nice()
  .range([height5 - margin5.bottom, margin5.top]);

// Create bars
svg5
  .selectAll("rect")
  .data(data5)
  .enter()
  .append("rect")
  .attr("class", "bar5")
  .attr("x", (d) => xScale5(d.xAxisvalue))
  .attr("y", (d) => yScale5(parseFloat(d.yAxisvalue.replace("$", ""))))
  .attr("width", "31px")
  .attr(
    "height",
    (d) =>
      height5 -
      margin5.bottom -
      yScale5(parseFloat(d.yAxisvalue.replace("$", "")))
  )
  .attr("rx", 18)
  .attr("ry", 18)
  .style("fill", (d) => d.color);

// Add x-axis
const xAxis5 = d3.axisBottom(xScale5);
svg5
  .append("g")
  .attr("transform", `translate(0, ${height5 - margin5.bottom})`)
  // .call(xAxis5)
  .selectAll(".tick text")
  .attr("dy", "40px")
  .style("opacity", 0.5)
  .style("font-size", "28px"); // Set font size for x-axis text

// Add y-axis
const yAxis5 = d3
  .axisLeft(yScale5)
  .ticks(2) // Set the number of ticks
  .tickFormat(d3.format("$,.0f")); // Format the tick values
svg5
  .append("g")
  .attr("transform", `translate(${margin5.left}, 0)`)
  .call(yAxis5)
  .selectAll(".tick line")
  .remove(); // Remove y-axis tick lines

const gridlines5 = svg5
  .selectAll("line.horizontal-grid")
  .data([40, 80, 60])
  .enter()
  .append("line")
  .attr("class", "horizontal-grid")
  .attr("x1", margin5.left)
  .attr("y1", (d) => yScale5(d))
  .attr("x2", width5 - margin5.right)
  .attr("y2", (d) => yScale5(d))
  .style("stroke", "gray")
  .style("stroke-width", 0.7)
  .style("stroke-dasharray", "5")
  .style("opacity", 0.5);

svg5
  .selectAll(".tick text")
  .style("fill", "black")

  .style("font-size", "24px");

// Remove y-axis domain line
svg5.selectAll(".domain").remove();
svg5.selectAll(".tick line").remove();

// Custom Tooltip
// const tooltip = d3.select("#tooltip5")

//   .style("opacity", 0);

// svg5.selectAll(".bar5")
//   .on("mouseover", function(event, d) {
//     const xPosition = parseFloat(d3.select(this).attr("x")) + xScale5.bandwidth() / 2;
//     const yPosition = parseFloat(d3.select(this).attr("y")) + 15;

//     tooltip.transition()
//       .duration(200)
//       .style("opacity", .9);

//     tooltip.html(`<strong>X Value:</strong> ${d.xAxisvalue}<br><strong>Y Value:</strong> ${d.yAxisvalue}`)
//       .style("left", xPosition + "px")
//       .style("top", yPosition + "px");
//   })
//   .on("mouseout", function() {
//     tooltip.transition()
//       .duration(500)
//       .style("opacity", 10);
//   });

// Custom Tooltip
const tooltip = d3.select("#tooltip5").style("opacity", 0);

svg5
  .selectAll(".bar5")
  .on("mouseover", function (event, d) {
    tooltip.transition().duration(200).style("opacity", 0.9);

    // Get mouse coordinates
    const mouseX = event.pageX;
    console.log(mouseX);

    const mouseY = event.pageY;
    console.log(mouseY);
    // Position the tooltip relative to the mouse position
    tooltip
      .style("left", mouseX + 10 + "px")
      .style("top", mouseY + 10 + "px")
      .html(
        `<strong style="color: #3A4DE9;">Views:</strong> ${d.xAxisvalue} <strong>Y Value:</strong> ${d.yAxisvalue}`
      );
  })
  .on("mouseout", function () {
    tooltip.transition().duration(500).style("opacity", 0);
  });
