const TurnCommand = require("./TurnCommand");

class TurnRightCommand extends TurnCommand {
  map = {
    'C': 'D',
    'D': 'B',
    'B': 'E',
    'E': 'C'
  }
}

module.exports = TurnRightCommand;
