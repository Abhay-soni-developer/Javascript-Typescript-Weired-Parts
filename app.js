"use strict";

// let name = "hello world";
var subject = "maths";

function getName() {
  console.log("hello world");
  console.log(subject, this, globalThis);
}

getName();
