const newVector = require('../utils/vectorMath').newVector;

class Probe {
  constructor(position, movementVector) {
    if (this.constructor === Probe) {
      throw new TypeError('Abstract class "Probe" cannot be instantiated directly!');
    }

    this.position = position || newVector(0, 0);
    this.movementVector = movementVector || newVector(0, 0);
    this._id = 0;
  }
}

module.exports = Probe;

