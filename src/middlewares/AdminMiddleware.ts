import IMiddleware from "../Core/IMiddleware";
import { Command } from "../Core/ICommand";

export default class AdminMiddleware implements IMiddleware {
  constructor(public readonly forCommands: Array<string>) {}

  public middle(command: Command): boolean {
    const username: string = command.message.author.username;

    if (username === "another dan") {
      return true;
    }

    command.message.react("🚫");
    return false;
  }
}
