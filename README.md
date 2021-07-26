# DISCBOT-FACTORY

A helper tool to create discord bots with [discord.js](https://discord.js.org/).

Pre builded modules like queue and voice. Simple implementations ways.

## Creating a instance

```ts
// src/index.ts

import { Core } from "discbot-factory";

const bot: Core = new Core("<bot-name>", "<prefix>", {});

bot.authClient("<token>");
```

## Creating commands

```ts
// src/commands/HelloWorldCommand.ts

import { ICommand, Command } from "discbot-factory";

export default class HelloWorldCommand implements ICommand {
  public readonly name: string = "hello"; // execute with <prefix>hello "!hello"
  public readonly description: string = "The hello world command";

  public execute(command: Command): void { 
    const author: string = command.message.author.username;

    command.message.channel.send(`Hello world, ${author}!`);
  }
}
```

## Registering commands

```ts
// src/index.ts

import { Core } from "discbot-factory";

import HelloWorldCommand from "./commands/HelloWorldCommand";

const bot: Core = new Core("<bot-name>", "<prefix>", {
  commands: [new HelloWorldCommand()],
});

bot.authClient("<token>");
```

## Modules

### Voice

A pre-builded voice module for create voice channel interactions.

```ts
import { Voice } from "discbot-factory";

const voice: Voice = new Voice("youtube"); // local or youtuber player.

async function playMusic(voiceChannel: VoiceChannel): Promise<void> {
  await voice.connect(voiceChannel);
  // if you are using local player, just pass the sound path.
  await voice.play("https://www.youtube.com/watch?v=mH_z5vAkf2c");

  voice.onEnd((): void => {
    console.log("Finished!");
  });
}
```

### Queue

A queue module, nice to use with voice module and to create cool experiences like mini-games.

```ts
import { Queue } from "discbot-factory";

const queue: Queue<string> = new Queue<string>();

queue.putOnTop("hello");
queue.putOnBottom("oh no, I'm the last");

// get the first item
console.log(queue.get()) // hello

queue.removeHead();

console.log(queue.get()) // oh no, I'm the last

queue.clear();

console.log(queue.getAll()); // []
```

## Public events

Equivalent to a `client.on("event", callback)` implementation.

```ts
import { IEvent, PublicEvents } from "discbot-factory";

import { Message } from "discord.js";

export default class MessageDeleteEvent implements IEvent<Message> {
  public readonly name: PublicEvents = PublicEvents.MESSAGE_DELETE;
  public readonly description: string = "On message delete event";

  public execute(message: Message): void {
    console.log(message.content);
  }
}
```
