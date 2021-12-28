/*
https://www.jasondavies.com/coffee-wheel/
- Take a look at the inspection of how svg content is made of path tags.
- Basics of how to create SVG paths out of data.
*/

let canvas = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500);

let data = [
    {x: 10, y: 20},
    {x: 40, y: 60},
    {x: 30, y: 70},
    {x: 50, y: 80}
];

let group = canvas.append("g")
    .attr("transform", "translate(100, 100)");

let line = d3.line()
    .x((d) => ( d.x ))
    .y((d) => ( d.y ));

group.selectAll("path")
    .data([data])
    .enter()
    .append("path")
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 10);