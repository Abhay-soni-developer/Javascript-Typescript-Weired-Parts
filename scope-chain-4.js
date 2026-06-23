function a() {
  var myVar = 2;

  function b() {
    console.log(myVar); // 2
    myVar = 3;
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
