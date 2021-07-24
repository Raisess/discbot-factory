import Core from "./Core/Core";
import Env from "./config/Env";

import HelloCommand from "./commands/Hello/HelloCommand";

const bot: Core = new Core(Env.NAME, Env.PREFIX, [new HelloCommand()]);

bot.authClient(Env.TOKEN);
