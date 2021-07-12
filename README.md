# Promise-Without-Promise

Intention of this mini project is to make Promise like javascript functionality without using Promises.

The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

A Promise is in one of these states:

pending: initial state, neither fulfilled nor rejected.<br>
fulfilled: meaning that the operation was completed successfully.<br>
rejected: meaning that the operation failed.<br>

As the Promise.prototype.then() and Promise.prototype.catch() methods return promises, they can be chained.

![Promise chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)

The methods promise.then(), promise.catch(), and promise.finally() are used to associate further action with a promise that becomes settled.
