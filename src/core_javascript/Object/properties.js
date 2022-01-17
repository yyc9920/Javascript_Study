function makeUser(name, age) {
  return {
    name,
    age,
  };
}

let user = makeUser("Juan", 27);
console.log(user.name);

let obj = {
  test: null
};

console.log( "test" in obj );
