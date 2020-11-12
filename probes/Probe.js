const newVector = require('../utils/vectorMath').newVector;
const toInternal = require('../utils/directionMapper').toInternal;

class Probe {
  constructor(position, movementVector) {
    if (this.constructor === Probe) {
      throw new TypeError('Abstract class "Probe" cannot be instantiated directly!');
    }

    this.position = position || newVector(0, 0);
    this.movementVector = movementVector || toInternal('D');
    this._id = 0;
  }
}

module.exports = Probe;

