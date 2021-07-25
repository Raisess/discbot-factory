import { Client, Message } from "discord.js";

import ICommand, { Command } from "./ICommand";
import IEvent from "./IEvent";

enum ClientEvents {
  READY = "ready",
  MESSAGE = "message",
}

type Injectables = {
  commands?: Array<ICommand>;
  events?: Array<IEvent<unknown>>;
};

export default class Core {
  private readonly client: Client = new Client();

  constructor(
    private readonly clientName: string,
    private readonly prefix: string,
    private readonly injectables: Injectables,
  ) {
    this.pingOnReady();

    this.enableCommandDetection();
    this.enablePublicEvents();
  }

  public authClient(token: string): void {
    this.client.login(token);
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

  private enableCommandDetection(): void {
    this.client.on(
      ClientEvents.MESSAGE,
      async (message: Message): Promise<void> => {
        if (message.content.startsWith(this.prefix)) {
          const command: Command = this.extractCommandFromMessage(message);
          const commandImpl: ICommand | undefined =
            this.injectables.commands!.find(
              (c: ICommand): boolean => c.name.toLowerCase() === command.name,
            );

          if (commandImpl) await commandImpl.execute(command);
        }
      },
    );
  }

  private extractCommandFromMessage(message: Message): Command {
    const splittedMessage: Array<string> = message.content
      .split(" ")
      .filter((item: string): boolean => item !== "");
    const name: string = splittedMessage[0];

    splittedMessage.shift(); // remove command name and its now only arguments

    return {
      name: name.slice(1).toLowerCase(), // remove prefix from command name
      args: splittedMessage,
      message,
    };
  }

  private enablePublicEvents() {
    if (this.injectables.events?.length) {
      for (const event of this.injectables.events) {
        this.client.on(event.name, async (t: unknown): Promise<void> => {
          await event.execute(t);
        });
      }
    }
  }
}
