export default interface IEvent<T> {
  readonly name: PublicEvents;
  readonly description: string;

  execute(event: T): void | Promise<void>;
}

export enum PublicEvents {
  GUILD_MEMBER_ADD = "guildMemberAdd",
  MESSAGE_DELETE = "messageDelete",
}
