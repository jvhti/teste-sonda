const StandardProbe = require("../../probes/StandardProbe");
const MoveCommand = require("./MoveCommand");
const vectorMath = require("../../utils/vectorMath");

describe('Move Command', () => {
  it('should add the movement vector to the position', function () {
    const probe = new StandardProbe();
    const moveCommand = new MoveCommand();

    let initialPosition = vectorMath.newVector(probe.position.x, probe.position.y);

    moveCommand.execute(probe);
    expect(probe.position.x).toStrictEqual(initialPosition.x + probe.movementVector.x);
    expect(probe.position.y).toStrictEqual(initialPosition.y + probe.movementVector.y);

    initialPosition = vectorMath.newVector(probe.position.x, probe.position.y);
    probe.movementVector = {x: 2, y: 1};

    moveCommand.execute(probe);
    expect(probe.position.x).toStrictEqual(initialPosition.x + probe.movementVector.x);
    expect(probe.position.y).toStrictEqual(initialPosition.y + probe.movementVector.y);
  });

  it('should rollback successfully', function () {
    const probe = new StandardProbe(vectorMath.newVector(0, 0), vectorMath.newVector(2, 2));
    const moveCommand = new MoveCommand();

    let initialPosition = vectorMath.newVector(probe.position.x, probe.position.y);

    moveCommand.execute(probe);
    expect(probe.position.x).toStrictEqual(initialPosition.x + probe.movementVector.x);
    expect(probe.position.y).toStrictEqual(initialPosition.y + probe.movementVector.y);
    moveCommand.rollback(probe);
    expect(probe.position.x).toStrictEqual(initialPosition.x);
    expect(probe.position.y).toStrictEqual(initialPosition.y);

  });

  it('should throw error if movement is out of boundaries', function () {
    const probe = new StandardProbe(vectorMath.newVector(4, 0), vectorMath.newVector(1, 0));
    const moveCommand = new MoveCommand();

    expect(() => moveCommand.execute(probe)).toThrowError();
  });
});
