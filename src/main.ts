import Core from "./Core";
import Env from "./config/Env";

import HelloCommand from "./commands/HelloCommand";

const bot: Core = new Core(Env.NAME, Env.PREFIX, [new HelloCommand()]);

bot.authClient(Env.TOKEN);
