const viewer = require('./probeViewer');
const StandardProbe = require('../probes/StandardProbe');

const newVector = require('../utils/vectorMath').newVector;
const directionDictionary = require('../utils/directionMapper').dictionary;

describe('Probe Viewer', function () {
  it('should throw error if the input object isn\'t a subclass of Probe', function () {
    expect(() => viewer({test: 1})).toThrowError(TypeError);
  });

  it('should return an object containing X, Y and face', function () {
    const view = viewer(new StandardProbe());
    expect(typeof view).toStrictEqual("object");
    expect(view).toHaveProperty('x');
    expect(view).toHaveProperty('y');
    expect(view).toHaveProperty('face');
    expect(view.x).not.toBeNaN();
    expect(view.y).not.toBeNaN();
    expect(Object.keys(directionDictionary)).toContain(view.face);
  });

  it('should show the current X and Y', function () {
    const view = viewer(new StandardProbe(newVector(15, 20)));

    expect(view.x).toStrictEqual(15);
    expect(view.y).toStrictEqual(20);
  });
});
