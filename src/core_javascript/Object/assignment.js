// #1

let user = {};

user.name = "John";
user.surname = "Smith";
user.name = "Pete";

delete user.name;

// #2

function isEmpty(obj) {
  return (Object.keys(obj).length === 0);
}

let schedule = {};

console.log( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

console.log( isEmpty(schedule) ); // false

// #3

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
};

let a = {};

let getSum = (salaries) => {
  let foo = 0;
  for (key in salaries) {
    foo += salaries[key];
  }
  return foo;
};

let sum = getSum(salaries);
console.log(sum);
sum = getSum(a);
console.log(sum);

// #4

function multiplyNumeric(obj) {
  for (key in obj) {
    (typeof obj[key]) === "number" ? obj[key] = obj[key]*2 : "pass";
  }
}

let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

console.log(menu);

multiplyNumeric(menu);

console.log(menu);
