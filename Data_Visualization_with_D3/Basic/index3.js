/*
- Tips & Tricks on handling arrays in d3.js
*/

let data = [10, 20, 30, 40, 50];

console.log(data);
console.log(d3.min(data));
console.log(d3.max(data));
console.log(d3.extent(data));
console.log(d3.sum(data));
console.log(data.sort(d3.descending));
console.log(data.sort(d3.ascending));
console.log(d3.mean(data));
console.log(d3.median(data));
console.log(d3.shuffle(data));