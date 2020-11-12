function newVector(x, y) {
  return {x: x, y: y};
}

function _validateVector(vec) {
  if (typeof vec !== 'object' || !vec.hasOwnProperty('x') || !vec.hasOwnProperty('y'))
    throw new Error(`Vetor mal formado! ${JSON.stringify(vec)}`);
}

function isEqual(a, b) {
  _validateVector(a);
  _validateVector(b);
  return a.x === b.x && a.y === b.y;
}

function add(a, b) {
  _validateVector(a);
  _validateVector(b);
  return {x: a.x + b.x, y: a.y + b.y};
}

module.exports = {
  newVector,
  isEqual,
  add
};
