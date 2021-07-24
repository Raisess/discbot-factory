import { VoiceConnection, StreamOptions, StreamDispatcher } from "discord.js";

export default interface IPlayer {
  readonly name: Player;

  play(
    voiceConnection: VoiceConnection,
    audioPath: string,
    streamOptions: StreamOptions,
  ): StreamDispatcher;
}

export type Player = "local" | "youtube";
