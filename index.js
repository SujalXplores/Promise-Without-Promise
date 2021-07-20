'use strict';

class MyPromise {
  promiseChain = [];

  constructor(callback) {
    this.promiseChain = [];
    this.handleError = () => {};

    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);

    callback(this.onResolve, this.onReject);
  }

  then(handleSuccess) {
    this.promiseChain.push(handleSuccess);
    return this;
  }

  catch(handleError) {
    this.handleError = handleError;
    return this;
  }

  onResolve(value) {
    let storedValue = value;

    try {
      this.promiseChain.forEach((nextFunction) => {
        storedValue = nextFunction(storedValue);
      });
    } catch (error) {
      this.promiseChain = [];
      this.onReject(error);
    }
  }

  onReject(error) {
    this.handleError(error);
  }
}

function onClickHandler() {
  const makeApiCall = () => {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.05) {
          const user = {
            name: 'Sujal',
            surname: 'Shah',
          };
          resolve(user);
        } else {
          const err = {
            errorCode: '404',
            message: 'User not found',
          };
          reject(err);
        }
      }, 1000);
    });
  };

  makeApiCall()
    .then((user) => {
      console.log('1️⃣ In the first .then()');
      return user;
    })
    .then((user) => {
      console.log(`2️⃣ User ${user.name}`);
      return user;
    })
    .then((user) => {
      console.log('3️⃣ The previous .then() told you your name');
      return user.surname;
    })
    .then((surname) => {
      console.log(`4️⃣ The surname is ${surname}`);
    })
    .then(() => {
      console.log('5️⃣ Inside last then()');
    })
    .catch((error) => {
      console.log(error.message);
    });
}
