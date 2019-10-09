import { BotModule } from "../bot-module";
import { EventEmitter } from "events";
import { BotCommandEvent } from "../../bot-event";
import { UserMessage } from "../../message/user-message";
import { User } from "../../user/user";
import { Channel } from "../../channel/channel";
import { Bot } from "../../bot";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class CommandManager extends EventEmitter {

    private botModule: BotModule;

    constructor(module: BotModule) {
        super();

        this.botModule = module;
    }

    processCommand(message: string, targetBot: Bot, sender: User, channel: Channel): boolean {
        let partList = message.split(' ');
        let messagePart = [partList.shift(), partList.join(' ')];

        let command = messagePart[0];
        let args = messagePart[1];

        let hasCommand = this.rawListeners(command).length !== 0;

        if (!hasCommand) {
            return false;
        }

        let event = new BotCommandEvent(targetBot, sender, channel, command, args);

        this.emit(command, event);

        return !event.Cancelled;
    }

    // EventEmiiter overrides

    on(event: string | symbol, listener: (commandEvent: BotCommandEvent) => void): this {
        return super.on(event, listener);
    }

    once(event: string | symbol, listener: (commandEvent: BotCommandEvent) => void): this {
        return super.once(event, listener);
    }
}