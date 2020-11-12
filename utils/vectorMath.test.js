const vectorMath = require('./vectorMath');

describe('Vector Math', function () {
  it('should create a vector', function () {
    const vector = vectorMath.newVector(10, -4);

    expect(vector).toHaveProperty('x');
    expect(vector.x).toStrictEqual(10);
    expect(vector).toHaveProperty('y');
    expect(vector.y).toStrictEqual(-4);
  });

  describe('isEqual', function () {
    it('should throw an error if the vector doesn\'t have X and Y properties', function () {
      expect(() => vectorMath.isEqual({d: 5, e: 6}, {x: 1, y: 2})).toThrow();
      expect(() => vectorMath.isEqual({x: 1, y: 2}, {d: 5, e: 6})).toThrow();
    });

    it('should return false if the vectors are different', function () {
      const a = vectorMath.newVector(22, 16);
      const b = vectorMath.newVector(12, 66);

      expect(vectorMath.isEqual(a, b)).toStrictEqual(false);
    });

    it('should return true if the vectors are equal', function () {
      const a = vectorMath.newVector(12, 16);
      const b = vectorMath.newVector(12, 16);

      expect(vectorMath.isEqual(a, b)).toStrictEqual(true);
    });
  });

  describe('add', function () {
    it('should throw an error if the vector doesn\'t have X and Y properties', function () {
      expect(() => vectorMath.add({d: 5, e: 6}, {x: 1, y: 2})).toThrow();
      expect(() => vectorMath.add({x: 1, y: 2}, {d: 5, e: 6})).toThrow();
    });

    it('should return a new object with the sum of the input vectors', function () {
      const a = {x: 5, y: 6};
      const b = {x: 1, y: 5};

      const res = vectorMath.add(a, b);

      expect(res).toHaveProperty('x');
      expect(res).toHaveProperty('y');

      expect(res.x).toBe(a.x + b.x);
      expect(res.y).toBe(a.y + b.y);
    });
  });
});
