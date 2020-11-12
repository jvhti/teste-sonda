const directionMapper = require('./directionMapper');

describe('Direction Mapper Test - To Internal', function () {
  it('should throw an error if the direction is not mapped', function () {
    expect(() => directionMapper.toInternal('W')).toThrow();
  });

  it('should return an object containing X and Y as numbers', function () {
    const left = directionMapper.toInternal('C');
    expect(left).toHaveProperty('x');
    expect(left).toHaveProperty('y');
    expect(left.x).not.toBeNaN();
    expect(left.y).not.toBeNaN();
  });

  it('should return the correct movement vector for E', function () {
    const left = directionMapper.toInternal('E');

    expect(left.y).toStrictEqual(0);
    expect(left.x).toStrictEqual(-1);
  });
});

describe('Direction Mapper Test - To External', function () {
  it('should throw an error if the direction vector is not mapped', function () {
    expect(() => directionMapper.toExternal({x: 2, y: 3})).toThrow();
  });

  it('should throw an error if the direction vector doesn\'t have X and Y properties', function () {
    expect(() => directionMapper.toExternal({d: 5, e: 6})).toThrow();
  });

  it('should return the letter of the direction', function () {
    const letter = directionMapper.toExternal({x: 0, y: 1});
    expect(letter).toStrictEqual('C');
  });
});
