import Core from "./Core/Core";
import Env from "./config/Env";

import HelloCommand from "./commands/Hello/HelloCommand";
import QueueCommand from "./commands/Queue/QueueCommand";

const bot: Core = new Core(Env.NAME, Env.PREFIX, [
  new HelloCommand(),
  new QueueCommand(),
]);

bot.authClient(Env.TOKEN);
