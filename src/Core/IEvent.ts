// T, X and Y are discord client events callback parameters
// https://discord.js.org/#/docs/main/stable/class/Client
export default interface IEvent<T, X, Y> {
  readonly name: PublicEvent;
  readonly description: string;

  execute(t: T, x?: X, y?: Y): void | Promise<void>;
}

export enum PublicEvent {
  CHANNEL_CREATE = "channelCreate",
  CHANNEL_DELETE = "channelDelete",
  CHANNEL_UPDATE = "channelUpdate",
  GUILD_MEMBER_ADD = "guildMemberAdd",
  MESSAGE_DELETE = "messageDelete",
}
