function a() {
  function b() {
    console.log(myVar); // 1
    myVar = 3;
  }

  var myVar = 2;

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
