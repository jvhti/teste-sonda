const TurnLeftCommand = require('./gridCommands/TurnCommand/TurnLeftCommand');
const TurnRightCommand = require('./gridCommands/TurnCommand/TurnRightCommand');
const MoveCommand = require('./MoveCommand/MoveCommand');

const commands = {
  'GE': new TurnLeftCommand(),
  'GD': new TurnRightCommand(),
  'M': new MoveCommand()
};

function mapper(key) {
  if (!key || !Object.keys(commands).includes(key))
    throw new Error("Comando inválido!");

  return commands[key];
}

module.exports = {
  commands,
  mapper
};
