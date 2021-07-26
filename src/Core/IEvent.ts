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
  CHANNEL_PINS_UPDATE = "channelPinsUpdate",
  CHANNEL_UPDATE = "channelUpdate",
  EMOJI_CREATE = "emojiCreate",
  EMOJI_DELETE = "emojiDelete",
  EMOJI_UPDATE = "emojiUpdate",
  GUILD_BAN_ADD = "guildBanAdd",
  GUILD_BAN_REMOVE = "guildBanRemove",
  GUILD_CREATE = "guildCreate",
  GUILD_DELETE = "guildDelete",
  GUILD_INTEGRATIONS_UPDATE = "guildIntegrationsUpdate",
  GUILD_MEMBER_ADD = "guildMemberAdd",
  GUILD_MEMBER_AVAILABLE = "guildMemberAvailable",
  GUILD_MEMBER_REMOVE = "guildMemberRemove",
  GUILD_MEMBERS_CHUNK = "guildMembersChunk",
  GUILD_MEMBER_SPEAKING = "guildMemberSpeaking",
  GUILD_MEMBER_UPDATE = "guildMemberUpdate",
  GUILD_UNAVAILABLE = "guildUnavailable",
  GUILD_UPDATE = "guildUpdate",
  INVITE_CREATE = "inviteCreate",
  INVITE_DELETE = "inviteDelete",
  MESSAGE = "message",
  MESSAGE_DELETE = "messageDelete",
  MESSAGE_DELETE_BULK = "messageDeleteBulk",
  MESSAGE_REACTION_ADD = "messageReactionAdd",
  MESSAGE_REACTION_REMOVE = "messageReactionRemove",
  MESSAGE_REACTION_REMOVE_ALL = "messageReactionRemoveAll",
  MESSAGE_REACTION_REMOVE_EMOJI = "messageReactionRemoveEmoji",
  MESSAGE_UPDATE = "messageUpdate",
  PRESENCE_UPDATE = "presenceUpdate",
  ROLE_CREATE = "roleCreate",
  ROLE_DELETE = "roleDelete",
  ROLE_UPDATE = "roleUpdate",
  TYPING_START = "typingStart",
  USER_UPDATE = "userUpdate",
  VOICE_STATE_UPDATE = "voiceStateUpdate",
}
