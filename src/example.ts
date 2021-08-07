import { Core } from "./main";
import Env from "./config/Env";

import AdminMiddleware from "./middlewares/AdminMiddleware";

import HelloCommand from "./commands/Hello/HelloCommand";
import QueueCommand from "./commands/Queue/QueueCommand";
import MusicCommand from "./commands/Music/MusicCommand";

import MessageDeleteEvent from "./events/MessageDeleteEvent";

const bot: Core = new Core(Env.NAME, Env.PREFIX, {
  middlewares: [new AdminMiddleware(["hello"])],
  commands: [new HelloCommand(), new QueueCommand(), new MusicCommand()],
  events: [new MessageDeleteEvent()],
});

bot.authClient(Env.TOKEN);
