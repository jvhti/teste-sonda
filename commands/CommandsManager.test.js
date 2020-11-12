const commandsManager = require("./CommandsManager");
const TurnLeftCommand = require("./gridCommands/TurnCommand/TurnLeftCommand");

describe('Commands Manager', () => {
  it('should throw a error if the command isn\'t mapped', function () {
    expect(() => commandsManager.mapper('ERR')).toThrowError();
  });

  it('should return a valid command', function () {
    expect(commandsManager.mapper('GE')).toBeInstanceOf(TurnLeftCommand);
  });
});
