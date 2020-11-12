const newVector = require('../utils/vectorMath').newVector;
const toInternal = require('../utils/directionMapper').toInternal;
const types = require('./Types');

const startingDirection = 'D';

module.exports = (type) => {
  if (!types.hasOwnProperty(type))
    throw new Error(`Invalid type of probe! Type: '${type}'`);

  return new types[type](newVector(0, 0), toInternal(startingDirection));
}
