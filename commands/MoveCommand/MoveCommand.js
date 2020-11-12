const Command = require("../Command");
const vectorMath = require("../../utils/vectorMath");

const boundaries = {x: 5, y: 5};

class MoveCommand extends Command {
  execute(probe) {
    const newPosition = vectorMath.add(probe.position, probe.movementVector);

    if (newPosition.x >= boundaries.x || newPosition.y >= boundaries.y || newPosition.x < 0 || newPosition.y < 0)
      throw new Error("Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv");

    probe.position = newPosition;
  }

  rollback(probe) {
    probe.position = vectorMath.sub(probe.position, probe.movementVector);
  }
}

module.exports = MoveCommand;

