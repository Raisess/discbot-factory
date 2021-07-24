import Core from "./Core";
import Env from "./config/Env";

const bot: Core = new Core("Teste", []);

bot.authClient(Env.TOKEN);
