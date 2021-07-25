// T and Y as discord client events callback parameters
// https://discord.js.org/#/docs/main/stable/class/Client
export default interface IEvent<T, Y> {
  readonly name: PublicEvents;
  readonly description: string;

  execute(t: T, y?: Y): void | Promise<void>;
}

export enum PublicEvents {
  CHANNEL_CREATE = "channelCreate",
  CHANNEL_DELETE = "channelDelete",
  CHANNEL_UPDATE = "channelUpdate",
  GUILD_MEMBER_ADD = "guildMemberAdd",
  MESSAGE_DELETE = "messageDelete",
}
