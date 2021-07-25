import { Core } from "./main";
import Env from "./config/Env";

import HelloCommand from "./commands/Hello/HelloCommand";
import QueueCommand from "./commands/Queue/QueueCommand";
import MusicCommand from "./commands/Music/MusicCommand";

const bot: Core = new Core(Env.NAME, Env.PREFIX, [
  new HelloCommand(),
  new QueueCommand(),
  new MusicCommand(),
]);

bot.authClient(Env.TOKEN);
