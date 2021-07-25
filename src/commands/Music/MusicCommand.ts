import { Voice, ICommand, Command } from "../../main";

export default class MusicCommand implements ICommand {
  public readonly name: string = "music";
  public readonly description: string = "Music command";

  private voice: Voice = new Voice("youtube");

  public async execute(command: Command): Promise<void> {
    const link: string = command.args[0];

    await this.voice.connect(command.message.member?.voice.channel!);
    await this.voice.play(link);

    this.voice.onEnd((): void => {
      console.log("Finished!");
    });
  }
}
