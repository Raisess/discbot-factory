import { ICommand, Command } from "../../main";

export default class HelloCommand implements ICommand {
  public readonly name: string = "hello";
  public readonly description: string = "Hello command";

  public execute(command: Command): void {
    const author: string = command.message.author.username;

    command.message.channel.send(`Hello, ${author}!`);
  }
}
