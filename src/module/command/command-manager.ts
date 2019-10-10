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

    processCommandEvent(e: BotCommandEvent): boolean {
        this.botModule.emit('command', e);

        let hasCommand = this.rawListeners(e.Command).length !== 0;

        if (!hasCommand || e.Cancelled) {
            return false;
        }

        this.emit(e.Command, e);

        if (e.Cancelled) {
            return false;
        }

        return true;
    }

    dispatchCommand(bot: Bot, channel: Channel, sender: User, command: string, argument: string): boolean {
        let event = new BotCommandEvent(bot, sender, channel, this.botModule.Namespace, command, argument);

        return this.processCommandEvent(event);
    }

    // EventEmiiter overrides

    on(event: string | symbol, listener: (commandEvent: BotCommandEvent) => void): this {
        return super.on(event, listener);
    }

    once(event: string | symbol, listener: (commandEvent: BotCommandEvent) => void): this {
        return super.once(event, listener);
    }
}