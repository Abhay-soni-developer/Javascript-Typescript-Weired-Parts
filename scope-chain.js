function b() {
  console.log(myVar); // 1
  myVar = 3;
}

function a() {
  var myVar = 2;
  b();
  console.log(myVar); // 2
}

var myVar = 1;
console.log(myVar); // 1
a();
console.log(myVar); // 3

// expected output
// 1
// 1
// 2
// 3
