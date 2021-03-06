import { Client, Message } from "discord.js";

import IMiddleware from "./IMiddleware";
import ICommand, { Command } from "./ICommand";
import IEvent from "./IEvent";

enum ClientEvent {
  READY = "ready",
  MESSAGE = "message",
  WARN = "warn",
  ERROR = "error",
}

type Injectables = {
  middlewares?: Array<IMiddleware>;
  commands?: Array<ICommand>;
  events?: Array<IEvent<unknown, unknown, unknown>>;
};

export default class Core {
  private readonly client: Client = new Client();

  constructor(
    private readonly clientName: string,
    private readonly prefix: string,
    private readonly injectables: Injectables,
  ) {
    this.pingOnReady();
    this.captureWarningsAndErros();
    this.enableCommandDetection();
    this.enablePublicEvents();
  }

  public authClient(token: string): void {
    this.client.login(token);
  }

  private pingOnReady(): void {
    this.client.once(
      ClientEvent.READY,
      (): void => (
        console.log(this.clientName, "is ready for work!"),
        console.log("Logged in as", this.client.user?.tag)
      ),
    );
  }

  private enableCommandDetection(): void {
    this.client.on(
      ClientEvent.MESSAGE,
      async (message: Message): Promise<void> => {
        if (message.content.startsWith(this.prefix)) {
          const command: Command = this.extractCommandFromMessage(message);
          const commandImpl: ICommand | undefined =
            this.injectables.commands!.find(
              (c: ICommand): boolean => c.name.toLowerCase() === command.name,
            );

          if (commandImpl) {
            const hasMiddleware: IMiddleware | undefined =
              this.injectables.middlewares!.find((m) =>
                m.forCommands.includes(commandImpl.name),
              );

            if (hasMiddleware) {
              if (await hasMiddleware.middle(command)) {
                await commandImpl.execute(command);
              }
            } else {
              await commandImpl.execute(command);
            }
          }
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
        this.client.on(
          event.name,
          async (t: unknown, x?: unknown, y?: unknown): Promise<void> => {
            await event.execute(t, x, y);
          },
        );
      }
    }
  }

  private captureWarningsAndErros(): void {
    this.client.on(ClientEvent.ERROR, (err: Error): void => console.error(err));
    this.client.on(ClientEvent.WARN, (wrn: string): void => console.warn(wrn));
  }
}
