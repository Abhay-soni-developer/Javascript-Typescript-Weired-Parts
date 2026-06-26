"use strict";

function a() {
  var myVar = 2;

  function b() {
    // i = 3; // reference error in strict mode, as expected
    myVar = 3;
    // console.log(i, myVar, this);
  }

  b();
  console.log(myVar); // 3
}

var myVar = 1;
console.log(myVar); // 1
a();
console.log(myVar); // 1

// expected output
// 1
// 2
// 3
// 1

function buldFunctions() {
  var fns = [];
  for (var i = 0; i < 3; i++) {
    fns.push(() => {
      console.log("i m ", i);
    });
  }

  return fns;
}

buldFunctions().forEach((fn) => {
  fn(); // prints 3 , 3 times
});

function buldFunctions2() {
  var fns = [];
  for (var i = 0; i < 3; i++) {
    fns.push(
      ((j) => {
        return function () {
          console.log("i m ", j);
        };
      })(i),
    );
  }

  return fns;
}

buldFunctions2().forEach((fn) => {
  fn(); // prints 3 , 3 times
});
