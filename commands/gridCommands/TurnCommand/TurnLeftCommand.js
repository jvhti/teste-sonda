const TurnCommand = require("./TurnCommand");

class TurnLeftCommand extends TurnCommand {
  map = {
    'C': 'E',
    'E': 'B',
    'B': 'D',
    'D': 'C'
  }
}

module.exports = TurnLeftCommand;
