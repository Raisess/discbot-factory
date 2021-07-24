import {
  VoiceChannel,
  VoiceConnection,
  StreamOptions,
  StreamDispatcher,
} from "discord.js";

import { Player } from "./IPlayer";
import PlayerAdapter from "./PlayerAdapter";

enum VoiceEvents {
  START = "start",
  FINISH = "finish",
}

export type BroadcastState = "playing" | "idling" | "paused";

export default class Voice {
  private connection?: VoiceConnection;
  private dispatcher?: StreamDispatcher;

  private state: BroadcastState = "idling";
  private onEndCallback: () => void = () => {};

  constructor(
    private readonly player: Player,
    private readonly streamOptions: StreamOptions,
  ) {}

  public async connect(channel: VoiceChannel): Promise<void> {
    if (this.state === "idling") {
      this.connection = await channel.join();
    } else {
      console.error("Currently on a channel!");
    }
  }

  public play(audioPath: string): void {
    if (this.state !== "playing") {
      this.dispatcher = new PlayerAdapter(this.player).play(
        this.connection!,
        audioPath,
        this.streamOptions,
      );

      this.dispatcher.on(VoiceEvents.START, (): void => {
        this.state = "playing";
      });

      this.dispatcher.on(VoiceEvents.FINISH, (): void => {
        this.destroy();

        this.onEndCallback();
      });
    } else {
      console.error("Currently playing!");
    }
  }

  public onEnd(callback: () => void): void {
    this.onEndCallback = callback;
  }

  public pause(): void {
    if (this.state === "playing") {
      this.state = "paused";
      this.dispatcher!.pause();
    } else {
      console.error("You can't pause when bot is", this.state);
    }
  }

  public resume(): void {
    if (this.state === "paused") {
      this.state = "playing";
      this.dispatcher!.resume();
    } else {
      console.error("You can't resume when bot is", this.state);
    }
  }

  public setVolume(power: number): void {
    if (this.state !== "playing") {
      this.dispatcher!.setVolume(power);
    } else {
      console.error("Only can change volume when bot is playing");
    }
  }

  public destroy(): void {
    this.state = "idling";
    this.dispatcher!.destroy();
  }

  public disconnect(): void {
    this.destroy();
    this.connection!.disconnect();
  }
}
