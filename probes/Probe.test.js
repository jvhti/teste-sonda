const Probe = require('./Probe');

describe('Probe Abstract Class', function () {
  it('should throw TypeError if try to instantiate the Probe Abstract Class', function () {
    expect(() => new Probe()).toThrow(TypeError);
  });
});
