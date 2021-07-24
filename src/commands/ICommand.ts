import { Message } from "discord.js";

export default interface ICommand {
  name: string;
  description: string;

  execute(command: Command): void | Promise<void>;
}

export type Command = {
  name: string;
  args: Array<string>;
  message: Message;
};
