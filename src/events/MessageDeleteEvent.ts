import { IEvent, PublicEvent } from "../main";

import { Message } from "discord.js";

export default class MessageDeleteEvent implements IEvent<Message, {}> {
  public readonly name: PublicEvent = PublicEvent.MESSAGE_DELETE;
  public readonly description: string = "On message delete event";

  public execute(message: Message): void {
    console.log(message.content);
  }
}
