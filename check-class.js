class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName() {
    return this.firstName + " " + this.lastName;
  }
}

console.dir(User);

class Employee extends User {
  _id;

  constructor(fname, lname, id) {
    super(fname, lname);
    this._id = id;
  }

  get id() {
    return this._id;
  }
}
