const probeFactory = require('./probeFactory');
const StandardProbe = require('./StandardProbe');

describe('Probe Factory', function () {
  it('should throw an error if the probe type doesn\'t exists', function () {
    expect(() => probeFactory('not_found')).toThrow(Error);
  });

  it('should return a new Standard Probe when called with the type \'Standard\'', function () {
    const probe = probeFactory('Standard');
    expect(probe instanceof StandardProbe).toBeTruthy();
  });
});
