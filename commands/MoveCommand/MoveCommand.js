const Command = require("../Command");
const vectorMath = require("../../utils/vectorMath");


class MoveCommand extends Command {
  execute(probe) {
    probe.position = vectorMath.add(probe.position, probe.movementVector);
  }

  rollback(probe) {
    probe.position = vectorMath.sub(probe.position, probe.movementVector);
  }
}

module.exports = MoveCommand;

