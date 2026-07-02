"use strict";

(function (global) {
  var supportedLang = ["en", "es"];

  var greetings = {
    default: {
      en: "Hello",
      es: "Hola",
    },

    formal: {
      en: "Greetings",
      es: "Saludas",
    },
  };

  function Greeter(firstname, lastname, language) {
    return new Greeter.init(firstname, lastname, language);
  }

  Greeter.init = function (
    firstname = "default",
    lastname = "default",
    language = "en",
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.setLang(language);
    return this;
  };

  Greeter.fn = Greeter.prototype = {};

  Greeter.fn.getFullName = function () {
    return this.firstname + " " + this.lastname;
  };

  Greeter.fn.checkLangAvailability = function (lang) {
    return supportedLang.includes(lang);
  };

  var greet = function () {
    return greetings.default[this.language] + ", " + this.getFullName();
  };

  var formalGreet = function () {
    return greetings.formal[this.language] + ", " + this.getFullName();
  };

  Greeter.fn.greeting = function (type = "default") {
    switch (type) {
      case "default":
        return greet.call(this);
      case "formal":
        return formalGreet.call(this);
      default:
        throw new Error("Greeting type not supported");
    }
  };

  Greeter.fn.setLang = function (lang) {
    if (this.checkLangAvailability(lang)) {
      this.language = lang;
      return this;
    }

    throw new Error("language not supported");
  };

  Greeter.fn.getAvailableLang = function () {
    return [...supportedLang];
  };

  Greeter.init.prototype = Greeter.fn;
  global.Greeter = global.G$ = Greeter;
})(window);
