"use strict";

Function.prototype.myBind = function (ctx) {
  const originalFn = this;
  return function (...args) {
    return originalFn.apply(ctx, ...args);
  };
};

Function.prototype.myApply = function (ctx, args) {
  const sym = Symbol();
  ctx[sym] = this;
  const result = ctx[sym](args);
  delete ctx[sym];
  return result;
};

const person = {
  name: "Abhay Soni the great",
};

function printName() {
  console.log(`My name is ${this.name}`);
}

// const getName = printName.myBind(person);
printName.myApply(person);

// getName();
