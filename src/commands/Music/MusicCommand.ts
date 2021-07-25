import ICommand, { Command } from "../../Core/ICommand";
import Voice from "../../Core/modules/Voice/Voice";

export default class MusicCommand implements ICommand {
  public readonly name: string = "music";
  public readonly description: string = "Music command";

  private voice: Voice = new Voice("youtube");

  public async execute(command: Command): Promise<void> {
    const link: string = command.args[0];
    const volume: number | undefined = Number(command.args[1]);

    await this.voice.connect(command.message.member?.voice.channel!);
    this.voice.setVolume(volume || 1);
    await this.voice.play(link);

    this.voice.onEnd((): void => {
      console.log("Finished!");
    });
  }
}
