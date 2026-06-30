if (!Object.myCreate) {
  Object.myCreate = function (target, propertiesDescriptor) {
    if (!(arguments.length === 1 || arguments.length === 2)) {
      throw new Error("myCreate accepts 1 or 2 arguments");
    }

    if (
      target !== null &&
      typeof target !== "object" &&
      typeof target !== "function"
    ) {
      throw new TypeError("Prototype must be an object, function, or null");
    }
    var obj;

    if (target === null) {
      obj = {};
      Object.setPrototypeOf(obj, target);
    } else {
      function F() {}
      F.prototype = target;
      obj = new F();
    }

    if (
      arguments.length === 2 &&
      typeof propertiesDescriptor !== "object" &&
      !(propertiesDescriptor instanceof Array)
    ) {
      throw new Error("propertiesDescriptor should be an object");
    } else {
      Object.defineProperties(obj, propertiesDescriptor);
    }

    return obj;
  };
}
