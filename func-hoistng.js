// greet();
// ReferenceError: greet is not defined
// Reason: `greet` is the internal name of the function expression,
// not a variable in the outer scope.
// anonymous();

// ReferenceError: Cannot access 'anonymous' before initialization
// Reason: `anonymous` is declared with let, so it is hoisted but in TDZ.

let anonymous = function greet() {
  console.log("hello");
  console.log(greet);
};

// greet();
// ReferenceError: greet is not defined
// Reason: `greet` is only available inside the function body.

anonymous();
// Works because `anonymous` now contains the function value.

// console.log(anonymous.code, anonymous.name);
