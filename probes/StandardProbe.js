const Probe = require('./Probe');

class StandardProbe extends Probe {
  constructor(position, movementVector) {
    super(position, movementVector);
    this.type = "Standard";
  }
}

module.exports = StandardProbe;

