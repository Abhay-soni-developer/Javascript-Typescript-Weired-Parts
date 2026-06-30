function myInstaceOf(obj, isItThis) {
  if (obj == null) return false;

  if (typeof isItThis !== "function") {
    throw new TypeError("R.H.S must me callable");
  }

  if (typeof obj !== "object" && typeof obj !== "function") {
    return false;
  }

  let proto = Object.getPrototypeOf(obj);

  while (proto) {
    if (proto === isItThis.prototype) {
      return true;
    }

    proto = Object.getPrototypeOf(proto);
  }

  return false;
}
