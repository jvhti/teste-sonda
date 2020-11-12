const Command = require("../../Command");
const directionMapper = require('../../../utils/directionMapper');

class TurnCommand extends Command {
  map = {}

  constructor() {
    super();

    if (this.constructor === TurnCommand) {
      throw new TypeError('Abstract class "TurnCommand" cannot be instantiated directly!');
    }
  }

  execute(probe) {
    probe.movementVector = directionMapper.toInternal(this.map[directionMapper.toExternal(probe.movementVector)]);
  }

  rollback(probe) {
    for (const key in this.map) {
      if (this.map[key] === directionMapper.toExternal(probe.movementVector)) {
        probe.movementVector = directionMapper.toInternal(key);
        break;
      }
    }
  }
}

module.exports = TurnCommand;

