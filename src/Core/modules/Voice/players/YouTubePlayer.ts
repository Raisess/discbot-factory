import { VoiceConnection, StreamOptions, StreamDispatcher } from "discord.js";
import ytdl from "ytdl-core-discord";

import IPlayer, { Player } from "../IPlayer";

export default class YouTubePlayer implements IPlayer {
  public readonly name: Player = "youtube";

  public async play(
    voiceConnection: VoiceConnection,
    audioPath: string,
    streamOptions?: StreamOptions,
  ): Promise<StreamDispatcher> {
    const yt: any = await ytdl(audioPath);

    return voiceConnection.play(yt, { type: "opus", ...streamOptions });
  }
}
