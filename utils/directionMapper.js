const dictionary = {
  'C': {x: 0, y: 1},
  'D': {x: 1, y: 0},
  'B': {x: 0, y: -1},
  'E': {x: -1, y: 0}
};

function toInternal(direction) {
  if (!dictionary.hasOwnProperty(direction))
    throw new Error(`Não foi possível mapear a direção '${direction}'.`);

  return dictionary[direction];
}

function toExternal(direction) {
  if (!direction.hasOwnProperty('x') || !direction.hasOwnProperty('y'))
    throw new Error('Vetor de direção está mal formado!');

  for (const key in dictionary) {
    if (dictionary[key].x === direction.x && dictionary[key].y === direction.y) return key;
  }

  throw new Error(`Não foi possível mapear a direção interna '${JSON.stringify(direction)}'.`);
}

module.exports = {
  toInternal,
  toExternal
};
