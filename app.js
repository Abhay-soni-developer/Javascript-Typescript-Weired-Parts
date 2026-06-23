"use strict";

// console.log(subject);
// let name = "hello world";

console.log(this, globalThis);

var subject = "maths";
console.log(subject);

function getName() {
  console.log("hello world");
  console.log(subject, this, globalThis);
}

getName();

function getThis() {
  console.log(this);
  function imThis() {
    console.log("i am this", this);
  }
  imThis();
}

getThis();
