# DISCBOT-FACTORY

A helper tool to create discord bots with [discord.js](https://discord.js.org/).

Pre builded modules like queue and voice. Simple implementations ways.

## Creating a instance

```ts
// src/index.ts

import { Core } from "discbot-factory";

const bot: Core = new Core("<bot-name>", "<prefix>", []);

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

const bot: Core = new Core("<bot-name>", "<prefix>", [
  new HelloWorldCommand(),
]);

bot.authClient("<token>");
```
