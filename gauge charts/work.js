function drawGauge(value) {
    // Define dimensions
    const width = 681;
    const height = 550;
    const margin = 20;
    const radius = Math.min(width, height) / 2 - margin;
  
    // Define data
    const data = {
      value: value,
      min: 0,
      max: 100,
    };
  
    // Create SVG
    const svg = d3.select("#gauge1").attr("width", width).attr("height", height);
  
    // Create gauge group
    const gauge = svg.append("g").attr("transform", `translate(${340}, ${120})`);
  
    // Define color scale
    const color = d3
      .scaleLinear()
      .domain([0, 50, 100])
      .range(["red", "#2b43ff", "#2b43ff"]);
  
    // Create background arc
    const backgroundArc = d3
      .arc()
      .innerRadius(radius * 0.85)
      .outerRadius(radius * 0.75)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2)
      .cornerRadius(10);
  
    // Draw background arc
    gauge
      .append("path")
      .attr("d", backgroundArc)
      .attr("fill", "#E9ECF1")
      .attr("transform", `translate(0, ${radius})`);
  
    // Create performance arc
    const arc = d3
      .arc()
      .innerRadius(radius * 0.86)
      .outerRadius(radius * 0.75)
      .startAngle(-Math.PI / 2)
      .endAngle((data.value / data.max) * Math.PI - Math.PI / 2)
      .cornerRadius(10);
  
    // Draw arc
    gauge
      .append("path")
      .attr("d", arc)
      .attr("fill", color(data.value))
      .attr("stroke-width", 2)
      .attr("transform", `translate(0, ${radius})`);
  
    // Create SVG with message
    if (data.value <= 50) {
      //   gauge.append("svg")
      //     .attr("width", "220")
      //     .attr("height", "360")
      //     .attr("viewBox", "0 0 220 118")
      //     .append("circle")
      //     .attr("cx", "60.979")
      //     .attr("cy", "59.6997")
      //     .attr("r", "59.4556")
      //     .attr("fill", "#E9ECF3");
  
      const emoji = d3.select("#sad-emoji");
  
      emoji.style("display", "block");
  
      //   // appended text message
      gauge
        .append("text")
        .attr("text-anchor", "middle")
        .attr("y", radius + 50)
        .text("Need improvement")
        .style("fill", "#000000")
        .style("font-size", "31px")
        .style("font-weight", "600");
  
      const userMessage = gauge
        .append("foreignObject")
        .attr("class", "message")
        .attr("y", radius + 70)
        .attr("x", -radius + 70)
        .attr("width", 383)
        .attr("height", 100);
  
      userMessage
        .append("xhtml:div")
        .attr("text-anchor", "middle")
        .html("Here are some tips on how to improve your score")
        .style("fill", "#000000")
        .style("font-size", "27px")
        .style("font-weight", "400")
        .style("opacity", "50%")
        .style("text-align", "center");
    } else {
      //   gauge.append("svg")
      //     .attr("width", "120")
      //     .attr("height", "120")
      //     .attr("viewBox", "0 0 120 120")
      //     .append("circle")
      //     .attr("cx", "59.979")
      //     .attr("cy", "59.6997")
      //     .attr("r", "59.4556")
      //     // .attr("fill", "none")
      //     // .append("path")
      //     // .attr("fill-rule", "evenodd")
      //     // .attr("clip-rule", "evenodd")
      //     .attr("d", "M26.9756 53.7169C41.5697 53.7169 53.4005 41.8861 53.4005 27.292C53.4005 12.698 41.5697 0.867188 26.9756 0.867188C12.3816 0.867188 0.550781 12.698 0.550781 27.292C0.550781 41.8861 12.3816 53.7169 26.9756 53.7169ZM19.594 26.0921C21.5757 26.0921 23.1822 24.4856 23.1822 22.5038C23.1822 20.5221 21.5757 18.9156 19.594 18.9156C17.6123 18.9156 16.0058 20.5221 16.0058 22.5038C16.0058 24.4856 17.6123 26.0921 19.594 26.0921ZM37.9449 22.5038C37.9449 24.4856 36.3384 26.0921 34.3566 26.0921C32.3749 26.0921 30.7684 24.4856 30.7684 22.5038C30.7684 20.5221 32.3749 18.9156 34.3566 18.9156C36.3384 18.9156 37.9449 20.5221 37.9449 22.5038ZM26.9754 42.2903C33.0338 42.2903 37.9451 37.2772 37.9451 31.2189H16.0058C16.0058 37.2772 20.9171 42.2903 26.9754 42.2903Z")
      //     .attr("fill", "#3A4DE9");
  
      const emoji = d3.select("#happy-emoji");
      emoji.style("display", "block");
      //   // appended text message
      gauge
        .append("text")
        .attr("text-anchor", "middle")
        .attr("y", radius + 50)
        .text("Great job!")
        .style("fill", "#000000")
        .style("font-size", "31px")
        .style("font-weight", "600");
    }
  }
  
  drawGauge(20);
  
  function drawGauge2(value) {
    // Define dimensions
    const width = 400;
    const height = 300;
    const margin = 20;
    const radius = Math.min(width, height) / 2 - margin;
  
    // Define data
    const data = {
      value: value,
      min: 0,
      max: 100,
    };
    // Create SVG
    const svg = d3.select("#gauge2").attr("width", width).attr("height", height);
    // Create gauge group
    const gauge = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
    // Define color scale
    const color = d3
      .scaleLinear()
      .domain([0, 50, 100])
      .range(["red", "#2b43ff", "#2b43ff"]);
    // Create background arc
    const backgroundArc = d3
      .arc()
      .innerRadius(radius * 0.85)
      .outerRadius(radius * 0.8)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2)
      .cornerRadius(10);
    // Draw background arc
    gauge
      .append("path")
      .attr("d", backgroundArc)
      .attr("fill", "#E9ECF1")
      .attr("transform", `translate(0, ${radius})`);
    // Create performance arc
    const arc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.75)
      .startAngle(-Math.PI / 2)
      .endAngle((data.value / data.max) * Math.PI - Math.PI / 2)
      .cornerRadius(10);
    // Draw arc
    gauge
      .append("path")
      .attr("d", arc)
      .attr("fill", color(data.value))
      .attr("stroke-width", 2)
      .attr("transform", `translate(0, ${radius})`);
  
    // Create title
    gauge
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", -radius * 0.5)
      .text("Grace’s Score")
      .style("font-size", "18px");
  
    // Create value text
    gauge
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", radius)
      .text(`${data.value}%`)
      .style("font-size", "24px");
  }
  
  drawGauge2(75);
  