import { VoiceConnection, StreamOptions, StreamDispatcher } from "discord.js";

import IPlayer, { Player } from "./IPlayer";
import LocalPlayer from "./players/LocalPlayer";
import YouTubePlayer from "./players/YouTubePlayer";

export default class PlayerAdapter implements IPlayer {
  private readonly players: Array<IPlayer> = [
    new LocalPlayer(),
    new YouTubePlayer(),
  ];

  constructor(public readonly name: Player) {}

  public play(
    voiceConnection: VoiceConnection,
    audioPath: string,
    streamOptions: StreamOptions,
  ): StreamDispatcher {
    const player: IPlayer = this.players.find(
      (p: IPlayer): boolean => p.name === this.name,
    )!;

    return player.play(voiceConnection, audioPath, streamOptions);
  }
}
