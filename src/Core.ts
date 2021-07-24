import { Client, Message, User } from "discord.js";

// import ICommand from "./commands/ICommand";

enum ClientEvents {
  READY = "ready",
  MESSAGE = "message",
}

type Command = {
  author: User;
  name: string;
  args: Array<string>;
};

export default class Core {
  private readonly client: Client = new Client();

  constructor(
    protected clientName: string,
    protected prefix: string, // private commands: Array<ICommand>,
  ) {
    this.pingOnReady();

    this.enableCommandDetection();
  }

  private pingOnReady(): void {
    this.client.once(
      ClientEvents.READY,
      (): void => (
        console.log(this.clientName, "is ready for work!"),
        console.log("Logged in as", this.client.user?.tag)
      ),
    );
  }

  public authClient(token: string): void {
    this.client.login(token);
  }

  private enableCommandDetection(): void {
    this.client.on(ClientEvents.MESSAGE, (message: Message): void => {
      if (message.content.startsWith(this.prefix)) {
        const command: Command = this.extractCommandFromMessage(message);

        console.log(command);
      }
    });
  }

  private extractCommandFromMessage(message: Message): Command {
    const splittedMessage: Array<string> = message.content.split(" ");
    const name: string = splittedMessage[0];

    splittedMessage.shift(); // remove command name and its now only arguments

    return {
      author: message.author,
      name: name.slice(1), // remove prefix from command name
      args: splittedMessage,
    };
  }
}
