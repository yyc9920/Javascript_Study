let height = 100;
let marginY = 10;
let partHeight = height + marginY;

d3.json("/mydata.json").then((data) => {
    data.sort((a, b) => a.age - b.age);

    let canvas = d3.select("body").append("svg")
        .attr("width", 1000)
        .attr("height", 1000);

    let widthScale = d3.scaleLinear()
        .domain([0, data[data.length - 1].age])
        .range([0, 1000]);

    canvas.selectAll("rect")
        .data(data)
        .enter()
            .append("rect")
            .attr("width", (d) => ( widthScale( d.age )))
            .attr("height", height)
            .attr("y", (d, i) => ( i * partHeight ))
            .attr("fill", "blue");

    canvas.selectAll("text")
        .data(data)
        .enter()
            .append("text")
            .attr("fill", "white")
            .attr("y", (d, i) => ( i * partHeight + partHeight/2 ))
            .text((d) => ( d.name ))

    let axis = d3.axisBottom()
        .ticks(5)
        .scale(widthScale);

    canvas.append("g")
        .attr("transform", `translate(0, ${data.length * partHeight})`)
        .call(axis);
})