let characters = [
  "Spider Man",
  "Iron Man",
  "Hulk",
  "Captain Ameraica",
  "Ant Man",
  "Thor",
  "Star Lord",
  "Hawk Eye",
  "Scarlet Witch",
  "Vision",
  "Falcon",
  "Winter Soldier"
]

characters.forEach((item) => { console.log(item); });

let data = characters.map((item)=>{
  return item.endsWith("Man");
});
console.log(data);

let data2 = characters.filter((item)=>{
  return item.endsWith("Man");
});
console.log(data2);
