import { Queue, ICommand, Command } from "../../main";

export default class QueueCommand implements ICommand {
  public readonly name: string = "queue";
  public readonly description: string = "queue";

  private queue: Queue<string> = new Queue<string>();

  public execute(command: Command): void {
    switch (command.args[0]) {
      case "add":
        this.queue.putOnTop(command.args[1]);
        break;
      case "show":
        const firstItem: string = this.queue.get();

        command.message.channel.send(firstItem);
        break;
      default:
        break;
    }
  }
}
