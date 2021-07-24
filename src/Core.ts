import { Client } from "discord.js";

import ICommand from "./commands/ICommand";

enum ClientEvents {
  READY = "ready",
}

export default class Core {
  private readonly client: Client = new Client();

  constructor(
    protected clientName: string,
    private commands: Array<ICommand>,
  ) {
    this.pingOnReady();
  }

  private pingOnReady(): void {
    this.client.once(
      ClientEvents.READY,
      (): void => (
        console.log(this.clientName, "is ready for work!"),
        console.log("Logged in", this.client.user?.tag)
      ),
    );
  }

  public authClient(token: string): void {
    this.client.login(token);
  }

  private runCommandOnMessage(): void {
    this.client.on("message", (): void => {});
  }
}
