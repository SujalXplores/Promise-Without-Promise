class MyPromise {
  // The callback function takes a resolve and reject
  // which map to the internal onResolve() and onReject() function.

  constructor(callback) {
    this.promiseChain = [];
    this.handleError = () => {};

    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);

    callback(this.onResolve, this.onReject);
  }

  then(handleSuccess) {
    this.promiseChain.push(handleSuccess);
    console.log(this);
    return this;
  }

  catch(handleError) {
    this.handleError = handleError;
    console.log(this);
    return this;
  }

  onResolve(value) {
    let storedValue = value;

    try {
      this.promiseChain.forEach((nextFunction) => {
        storedValue = nextFunction(storedValue);
        console.log(storedValue);
      });
    } catch (error) {
      this.promiseChain = [];
      console.log(this.promiseChain);
      this.onReject(error);
    }
  }

  onReject(error) {
    this.handleError(error);
  }
}

function onClickHandler(event) {
  fakeApiBackend = () => {
    const user = {
      username: "Sujal Shah",
      favoriteNumber: 42,
      profile: "https://gitconnected.com/SujalShah3234",
    };

    // Introduce a randomizer to simulate the
    // the probability of encountering an error
    if (Math.random() > 0.05) {
      return {
        data: user,
        statusCode: 200,
      };
    } else {
      const error = {
        statusCode: 404,
        message: "Could not find user",
        error: "Not Found",
      };

      return error;
    }
  };

  // Assume this is your AJAX library. Almost all newer
  // ones return a Promise Object
  const makeApiCall = () => {
    return new MyPromise((resolve, reject) => {
      // Use a timeout to simulate the network delay waiting for the response.
      // This is THE reason you use a promise. It waits for the API to respond
      // and after received, it executes code in the `then()` blocks in order.
      // If it executed is immediately, there would be no data.
      setTimeout(() => {
        const apiResponse = fakeApiBackend();

        if (apiResponse.statusCode >= 400) {
          reject(apiResponse);
        } else {
          resolve(apiResponse.data);
        }
      }, 5000);
    });
  };

  makeApiCall()
    .then((user) => {
      console.log("In the first .then()");

      return user;
    })
    .then((user) => {
      console.log(
        `User ${user.username}'s favorite number is ${user.favoriteNumber}`
      );

      return user;
    })
    .then((user) => {
      console.log("The previous .then() told you the favoriteNumber");

      return user.profile;
    })
    .then((profile) => {
      console.log(`The profile URL is ${profile}`);
    })
    .then(() => {
      console.log("This is the last then()");
    })
    .catch((error) => {
      console.log(error.message);
    });
}
