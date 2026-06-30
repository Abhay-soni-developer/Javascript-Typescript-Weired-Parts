function Human() {
  this.race = "indian";
}

function Male(name) {
  // super(this)
  Human.call(this);
  this.name = name;
}

Object.setPrototypeOf(Male.prototype, Human.prototype);

// console.log(Human.prototype);
// console.log(Male.prototype);
// console.log(Human.prototype === Male.prototype);

// // Male.prototype = Human.prototype;
// const human = new Human();
// Male.prototype = human;
// const abhay = new Male("abhay");

// console.log("abhay");
// console.log(human.race, abhay.name, abhay.race, abhay.__proto__);

// const c = [];

// console.log("array", c.__proto__);
// console.log("array", c.__proto__.__proto__);
let a = new Male("abhay");
console.log(a);
