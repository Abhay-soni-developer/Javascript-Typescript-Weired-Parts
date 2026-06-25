// "use strict";

function a() {
  console.log(this);
}

const b = function () {
  console.log(this);
};

a();
b();

var c = {
  name: "abhay",
  dev: {
    name: "the great developer",
    log: function () {
      console.log(this.name);
      function c() {
        console.log("inside c ", this);
      }
      c();
    },
  },
};

c.dev.log();
