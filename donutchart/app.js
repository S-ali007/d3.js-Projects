const width = 450,
  height = 450,
  margin = 40;

const radius = Math.min(width, height) / 2 - margin;

const svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .append("g")
  .attr("transform", `translate(${width / 2},${height / 2})`);

const data1 = { a: 15, b: 20, c: 65 };
const data2 = { a: 9, b: 16, c: 20, d: 14, e: 19, f: 12 };

const color = d3
  .scaleOrdinal()
  .domain(["a", "b", "c", "d", "e", "f"])
  .range(["#FFD1A7", "#FF9E69", "#2B4DED", "#FFD700", "#32CD32", "#FF69B4"]);

function update(data) {
  const pie = d3
    .pie()
    .value(function (d) {
      return d[1];
    })
    .sort(null);

  const data_ready = pie(Object.entries(data));

  const arc = d3
    .arc()
    .innerRadius(radius * 0.45)
    .outerRadius(radius * 0.8);

  const outerArc = d3
    .arc()
    .innerRadius(radius * 0.7)
    .outerRadius(radius * 1.1);

  const u = svg.selectAll("path").data(data_ready);
  u.join("path")
    .transition()
    .duration(1000)
    .attr("d", arc)
    .attr("fill", (d) => color(d.data[0]));

  svg
    .append("defs")
    .append("filter")
    .attr("id", "drop-shadow")
    .append("feDropShadow")
    .attr("dx", 0)
    .attr("dy", 1)
    .attr("stdDeviation", 4)
    .attr("flood-color", "#0000001A");

  const u1 = svg.selectAll("circle").data(data_ready);
  u1
    .join("circle")
    .transition()
    .duration(1000)
    .attr("cx", (d) => outerArc.centroid(d)[0])
    .attr("cy", (d) => outerArc.centroid(d)[1])
    .attr("r", radius * 0.3)
    .attr("fill", "#fff")
    .style("filter", "url(#drop-shadow)"); // Apply drop shadow

  const u2 = svg.selectAll("text").data(data_ready);
  u2
    .join("text")
    .transition()
    .duration(1000)
    .text((d) => `${d.data[1]}%`)
    .attr("x", (d) => outerArc.centroid(d)[0])
    .attr("y", (d) => outerArc.centroid(d)[1])
    .style("font-size", "20px")
    .style("font-weight", "600")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "#000");
}

update(data1);
