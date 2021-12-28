/*
- d3.js Basic selection and appending
- Visualizing Simple Data Array
- Linear Scaling
- SVG groups and axis
*/

/*
DOM Elements < data elements (enter)
DOM Elements > data elements (exit)
DOM Elements = data elements (update)
*/

let data = [20, 70, 40, 50, 60, 100];
let width = 500;
let height = 1000;

data.sort((a, b) => (a - b));
let widthScale = d3.scaleLinear()
                    .domain([0, data[data.length - 1]])
                    .range([0, width]);

let color = d3.scaleLinear()
                .domain([0, data[data.length - 1]])
                .range(["red", "blue"]);

let axis = d3.axisBottom()
            .scale(widthScale);

let canvas = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(20, 0)");

let bars = canvas.selectAll("rect")
            .data(data)
            .enter()
                .append("rect")
                .attr("width", function(d) { return widthScale(d); })
                .attr("height", 50)
                .attr("fill", function(d) { return color(d); })
                .attr("y", function(d, i) { return i * 100; });

canvas.append("g")
    .attr("transform", `translate(0, ${data.length * 100})`)
    .call(axis);
