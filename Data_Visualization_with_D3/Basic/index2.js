/*
- d3.js Transitions
*/

/*
DOM Elements < data elements (enter)
DOM Elements > data elements (exit)
DOM Elements = data elements (update)
*/

let canvas = d3.select("body")
                .append("svg")
                .attr("width", 500)
                .attr("height", 500);

let circle = canvas.append("circle")
                .attr("cx", 50)
                .attr("cy", 50)
                .attr("r", 25);

circle.transition()
    .duration(1500)
    .attr("cx", 150)
    .on("end", function() { d3.select(this).attr("fill", "red"); });