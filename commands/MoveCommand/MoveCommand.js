const Command = require("../Command");
const vectorMath = require("../../utils/vectorMath");

const boundaries = {x: 5, y: 5};

class MoveCommand extends Command {
  execute(probe) {
    probe.position = vectorMath.add(probe.position, probe.movementVector);

    if (probe.position.x >= boundaries.x || probe.position.y >= boundaries.y || probe.position.x < 0 || probe.position.y < 0)
      throw new Error("Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv");
  }

  rollback(probe) {
    probe.position = vectorMath.sub(probe.position, probe.movementVector);
  }
}

module.exports = MoveCommand;

