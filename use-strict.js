// "use strict"
// can use globally

var person;
persom = {}; // misspelled, but goes undetected and its very hard to debug

function init() {
  "use strict";
  // can use locally inside a function
  // but it needs to be thee first line inside function

  var person;
  persom2 = {}; // will throw an error
}
