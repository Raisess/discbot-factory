export default interface ICommand {
  name: string;
  description: string;

  execute(): void | Promise<void>;
}
