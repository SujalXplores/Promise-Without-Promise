class MyPromise {
  constructor(callback) {
    this.allPromises = [];

    this.handleError = () => {};

    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);

    callback(this.onResolve, this.onReject);
  }

  then(handleSuccess) {
    this.allPromises.push(handleSuccess);
  }

  catch(err) {
    this.handleError = err;
  }

  onResolve(data) {
    try {
      this.allPromises.forEach((p) => {
        console.log(p);
      });
    } catch (error) {
      this.allPromises = [];
      this.onReject(error);
    }
  }

  onReject(error) {
    this.handleError(error);
  }
}

function onClickHandler() {
  const p = new MyPromise((resolve, reject) => {});

  p.then((success) => {});
}
