import { VoiceConnection, StreamOptions, StreamDispatcher } from "discord.js";

import IPlayer, { Player } from "../IPlayer";

export default class LocalPlayer implements IPlayer {
  public readonly name: Player = "local";

  public play(
    voiceConnection: VoiceConnection,
    audioPath: string,
    streamOptions?: StreamOptions,
  ): StreamDispatcher {
    return voiceConnection.play(audioPath, streamOptions);
  }
}
