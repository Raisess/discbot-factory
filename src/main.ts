import Core from "./Core";
import Env from "./config/Env";

const bot: Core = new Core(Env.NAME, Env.PREFIX);

bot.authClient(Env.TOKEN);
