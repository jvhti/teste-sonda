class Command {
  constructor() {
    if (this.constructor === Command) {
      throw new TypeError('Abstract class "Command" cannot be instantiated directly!');
    }

    if (this.execute === undefined) {
      throw new TypeError('Classes extending the command abstract class should implement the `execute` method');
    }

    if (this.rollback === undefined) {
      throw new TypeError('Classes extending the command abstract class should implement the `rollback` method');
    }
  }
}

module.exports = Command;

