import { User } from "discord.js";

export default interface ICommand {
  name: string;
  description: string;

  execute(): void | Promise<void>;
}

export type Command = {
  author: User;
  name: string;
  args: Array<string>;
};
