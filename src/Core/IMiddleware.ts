import { Command } from "./ICommand";

export default interface IMiddleware {
  readonly forCommands: Array<string>;

  middle(command: Command): boolean | Promise<boolean>;
}
