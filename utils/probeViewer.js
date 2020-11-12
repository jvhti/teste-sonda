const Probe = require('../probes/Probe');
const toExternal = require("../utils/directionMapper").toExternal;

module.exports = (probe) => {
  if (!probe || !probe.prototype instanceof Probe)
    throw new TypeError("This method should only be called for subclasses of Probe.");

  return {x: probe.position.x, y: probe.position.y, face: toExternal(probe.movementVector)}
};
