const StandardProbe = require("../../probes/StandardProbe");
const TurnLeftCommand = require("./TurnLeftCommand");
const directionMapper = require("../../utils/directionMapper");
const TurnRightCommand = require("./TurnRightCommand");

describe('Turn Left Command', () => {
  it('should change to correct direction', function () {
    const probe = new StandardProbe();
    const turnLeftCommand = new TurnLeftCommand();

    turnLeftCommand.execute(probe);
    expect(directionMapper.toExternal(probe.movementVector)).toStrictEqual('C');

    turnLeftCommand.execute(probe);
    expect(directionMapper.toExternal(probe.movementVector)).toStrictEqual('E');

    turnLeftCommand.execute(probe);
    expect(directionMapper.toExternal(probe.movementVector)).toStrictEqual('B');

    turnLeftCommand.execute(probe);
    expect(directionMapper.toExternal(probe.movementVector)).toStrictEqual('D');
  });

  it('should rollback successfully', function () {
    const probe = new StandardProbe();
    const turnLeftCommand = new TurnLeftCommand();
    const original = directionMapper.toExternal(probe.movementVector);

    turnLeftCommand.execute(probe);
    expect(directionMapper.toExternal(probe.movementVector)).not.toStrictEqual(original);
    turnLeftCommand.rollback(probe);
    expect(directionMapper.toExternal(probe.movementVector)).toStrictEqual(original);

  });
});

describe('Turn Right Command', () => {
  it('should change to correct direction', function () {
    const probe = new StandardProbe();
    const turnRightCommand = new TurnRightCommand();

    turnRightCommand.execute(probe);
    expect(directionMapper.toExternal(probe.movementVector)).toStrictEqual('B');

    turnRightCommand.execute(probe);
    expect(directionMapper.toExternal(probe.movementVector)).toStrictEqual('E');

    turnRightCommand.execute(probe);
    expect(directionMapper.toExternal(probe.movementVector)).toStrictEqual('C');

    turnRightCommand.execute(probe);
    expect(directionMapper.toExternal(probe.movementVector)).toStrictEqual('D');
  });

  it('should rollback successfully', function () {
    const probe = new StandardProbe();
    const turnRightCommand = new TurnRightCommand();
    const original = directionMapper.toExternal(probe.movementVector);

    turnRightCommand.execute(probe);
    expect(directionMapper.toExternal(probe.movementVector)).not.toStrictEqual(original);
    turnRightCommand.rollback(probe);
    expect(directionMapper.toExternal(probe.movementVector)).toStrictEqual(original);

  });
});
