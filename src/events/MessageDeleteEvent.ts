import { IEvent, PublicEvents } from "../main";

import { Message } from "discord.js";

export default class MessageDeleteEvent implements IEvent<Message, {}> {
  public readonly name: PublicEvents = PublicEvents.MESSAGE_DELETE;
  public readonly description: string = "On message delete event";

  public execute(message: Message): void {
    console.log(message.content);
  }
}
