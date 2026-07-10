const state = Symbol("CurrentPromiseState");
const result = Symbol("PromiseSettledResult");
const promiseStates = Symbol("MyPromiseStates");
const handlers = Symbol("PromiseHandlers");

// function unwrapPromise(promise, getFinalValue) {
//   if (!(promise instanceof MyPromise)) {
//     throw new TypeError("passed value is not instance of MyPromise");
//   }

//   promise
//     .then((nextVal) => {
//       if (nextVal instanceof MyPromise) {
//         return unwrapPromise(nextVal, getFinalValue);
//       } else {
//         getFinalValue(nextVal, MyPromise[promiseStates].FULFILLED);
//       }
//     })
//     .catch((err) => {
//       getFinalValue(err, MyPromise[promiseStates].REJECTED);
//     });
// }

function MyPromise(executor) {
  // tradition and have its cons
  // if (!(this instanceof MyPromise)) {
  //   throw new TypeError("MyPromise can oy be executed with new");
  // }

  if (new.target === undefined) {
    throw new TypeError("MyPromise can only be called with new");
  }

  if (typeof executor !== "function") {
    throw new TypeError("executor should be function");
  }

  this[state] = MyPromise[promiseStates].PENDING;
  this[result] = undefined;
  // Record: {onFullfilled, onRejected, resolveNext, rejectNext}
  this[handlers] = [];
  let executorCalled = false;

  const managePromiseStates = (newState, settledValue) => {
    if (this[state] === MyPromise[promiseStates].PENDING) {
      this[state] = newState;
      this[result] = settledValue;
      processRecords.call(this);
    }
  };

  const resolveValue = (val) => {
    if (this === val) {
      rejectReason(new TypeError("Chaining cycle detected"));
      return;
    }

    // handling promise
    // if (val instanceof MyPromise) {
    //   val.then(resolveValue, rejectReason);
    //   return;
    // }

    let called = false;
    // thenable object
    if (
      val !== null &&
      (typeof val === "object" || typeof val === "function")
    ) {
      try {
        const then = val.then;
        if (typeof then === "function")
          then.call(
            val,
            (nextValue) => {
              if (!called) {
                called = true;
                resolveValue(nextValue);
              }
            },
            (error) => {
              if (!called) {
                called = true;
                rejectReason(error);
              }
            },
          );
        else managePromiseStates(MyPromise[promiseStates].FULFILLED, val);
        return;
      } catch (err) {
        if (!called) {
          called = true;
          return rejectReason(err);
        }
      }
    }

    managePromiseStates(MyPromise[promiseStates].FULFILLED, val);
  };

  const rejectReason = (error) => {
    managePromiseStates(MyPromise[promiseStates].REJECTED, error);
  };

  function withLock(fn) {
    return function (...args) {
      if (!executorCalled) {
        executorCalled = true;
        return fn(...args);
      }
    };
  }

  const resolve = withLock(resolveValue);
  const reject = withLock(rejectReason);

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }

  // implicitly done by compiler itself
  // return this;
}
// Hidden Methods

function processRecord(record) {
  let nextVal = this[result];
  let nextHandler = "resolveNext";

  const onStateAction =
    this[state] === MyPromise[promiseStates].FULFILLED
      ? "onFulfilled"
      : "onRejected";

  try {
    if (record[onStateAction]) {
      nextVal = record[onStateAction](this[result]);
    } else {
      nextHandler =
        this[state] === MyPromise[promiseStates].FULFILLED
          ? "resolveNext"
          : "rejectNext";
    }
    record[nextHandler](nextVal);
  } catch (err) {
    record.rejectNext(err);
  }
}

function scheduleRecordForProcessing(record) {
  queueMicrotask(() => {
    processRecord.call(this, record);
  });
}

function processRecords() {
  if (!(this instanceof MyPromise)) {
    throw new TypeError("context is not MyPromise instance");
  }
  if (this[state] === MyPromise[promiseStates].PENDING) return;

  while (this[handlers].length > 0) {
    const record = this[handlers].shift();
    scheduleRecordForProcessing.call(this, record);
  }
}

// Static Function
MyPromise[promiseStates] = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};

MyPromise.resolve = function (val) {
  // already a promise
  if (val instanceof MyPromise) {
    return val;
  }

  return new MyPromise((resolve) => {
    resolve(val);
  });
};

MyPromise.reject = function reject(error) {
  const newPromise = new MyPromise((_resolve, reject) => {
    reject(error);
  });

  return newPromise;
};

// common instance function

// if onFulfilled is undefined pass the value to the next handler
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (!(this instanceof MyPromise)) {
    throw new TypeError(
      "MyPromise.prototype.then called on an incompatible receiver",
    );
  }

  const handlerRecord = {
    onFulfilled: null,
    onRejected: null,
    resolveNext: null,
    rejectNext: null,
  };

  if (typeof onFulfilled === "function")
    handlerRecord.onFulfilled = onFulfilled;
  if (typeof onRejected === "function") handlerRecord.onRejected = onRejected;

  const nextPromise = new MyPromise((resolve, reject) => {
    handlerRecord.resolveNext = resolve;
    handlerRecord.rejectNext = reject;
  });

  if (this[state] === MyPromise[promiseStates].PENDING) {
    this[handlers].push(handlerRecord);
  } else {
    scheduleRecordForProcessing.call(this, handlerRecord);
  }

  return nextPromise;
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

MyPromise.prototype.finally = function (cleanup) {
  if (typeof cleanup !== "function") {
    return this.then(cleanup, cleanup);
  }

  return this.then(
    (val) => MyPromise.resolve(cleanup()).then(() => val),
    (error) =>
      MyPromise.resolve(cleanup()).then(() => {
        throw error;
      }),
  );
};

MyPromise.prototype[Symbol.toStringTag] = "MyPromise";
