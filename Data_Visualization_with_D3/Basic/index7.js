/*
- Create a simple pie chart with d3.js
*/
let data = [10, 50, 80];
let r = 300;

let color = d3.scaleOrdinal()
    .range(["red", "green", "blue"])

let canvas = d3.select("body").append("svg")
    .attr("width", 1500)
    .attr("height", 1500);

let group = canvas.append("g")
    .attr("transform", "translate(300, 300)");

let arc = d3.arc()
    .innerRadius(r - 100)
    .outerRadius(r);

let pie = d3.pie()
    .value((d) => (d));

let arcs = group.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

arcs.append("path")
    .attr("d", arc)
    .attr("fill", (d) => (color(d.data)));

arcs.append("text")
    .attr("transform", (d) => (`translate(${arc.centroid(d)})`))
    .attr("text-anchor", "middle")
    .attr("font-size", "1.5em")
    .text((d) => (d.data))