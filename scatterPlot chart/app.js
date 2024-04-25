// const data = [10, 20, 30, 40, 50];
async function getData() {
  const data = await d3.json("data.json");

  console.log(data);
}

getData();

const el = d3
  .select("ul")
  .selectAll("li")
  .data(data)
  //   .join(
  //     (enter) => {
  //       return enter.append("li").style("color", "purple");
  //     },
  //     (update) => update.style("color", "green"),
  //     (exist) => exist.remove()
  //   )

  .text((d) => d);

el.enter()
  .append("li")
  .text((d) => d);
el.exit().remove((d) => d);
console.log(el, "element");

// const svg = d3
//   .select("#bar-chart")
//   .append("circle")
//   .attr("cx", 100)
//   .attr("cy", 100)
//   .attr("r", 50)
//   .style("fill", "red");

// console.log(svg);
// svg
//   .append("text")
//   .attr("x", 100)
//   .attr("y", 100)
//   .attr("text-anchor", "middle")
//   .attr("alignment-baseline", "middle")
//   .text("hi");

// const el = d3
//   .select("body")
//   .append("svg")

//   .append("g")
//   //   .attr("transform", "translate(20,20)")
//   .selectAll("circle")
//   .data(data)
//   .enter()
//   .append("circle")
//   .attr("class", "circle")
//   .attr("cx", (d) => d)
//   .attr("cy", 100)
//   .attr("r", 10)
//   .style("fill", "red");

// console.log(el, "body");

// Sample data
// const data = [30, 50, 70, 90, 120];

// SVG dimensions
// const width = 400;
// const height = 200;
// const barPadding = 5;

// // Create SVG element
// const svg = d3.select("#bar-chart")
//     .attr("width", width)
//     .attr("height", height);

// // Create bars
// svg.selectAll("rect")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("x", (d, i) => i * (width / data.length))
//     .attr("y", d => height - d)
//     .attr("width", width / data.length - barPadding)
//     .attr("height", d => d);

//     svg.selectAll("rect")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("x", (d, i) => i * (width / data.length))
//     .attr("y", d => height - d)
//     .attr("width", width / data.length - barPadding)
//     .attr("height", d => d)
//     .attr("rx", 10) // Rounded corners
//     .attr("ry", 10); // Rounded corners
// // Optional: Add labels
// svg.selectAll("text")
//     .data(data)
//     .enter()
//     .append("text")
//     .text(d => d)
//     .attr("x", (d, i) => i * (width / data.length) + (width / data.length - barPadding) / 2)
//     .attr("y", d => height - d + 15)
//     .attr("text-anchor", "middle")
//     .attr("fill", "white");
