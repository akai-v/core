import { BotModule } from "../bot-module";
import { EventEmitter } from "events";
import { BotCommandEvent } from "../../bot-event";
import { UserMessage } from "../../message/user-message";
import { User } from "../../user/user";
import { Channel } from "../../channel/channel";
import { Bot } from "../../bot";
import { CommandInfo } from "./command-info";
import { Logger } from "../../logger/logger";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class CommandManager extends EventEmitter {

    private botModule: BotModule;

    private commandList: CommandInfo[];

    constructor(module: BotModule) {
        super();

        this.botModule = module;

        this.commandList = [];
    }

    get CommandList() {
        return this.commandList.slice(0);
    }

    addCommand(command: CommandInfo) {
        this.commandList.push(command);
    }

    hasCommand(command: CommandInfo): boolean {
        return this.commandList.includes(command);
    }

    removeCommand(command: CommandInfo): boolean {
        if (!this.hasCommand(command)) {
            return false;
        }

        this.commandList.splice(this.commandList.indexOf(command), 1);
    }

    removeAllCommand() {
        this.commandList = [];
    }

    forEach(func: (command: CommandInfo) => void) {
        this.commandList.forEach(func);
    }

    processCommandEvent(e: BotCommandEvent, logger: Logger): boolean {
        this.emit('command', e, logger);

        if (e.Cancelled) {
            return false;
        }

        this.emit(e.Command, e, logger);

        if (e.Cancelled) {
            return false;
        }

        this.botModule.emit('command', e, logger);

        if (e.Cancelled) {
            return false;
        }

        for (let command of this.commandList) {
            if (command.CommandList.includes(e.Command)) {
                command.onCommand(e, logger);
            }
        }

        return e.Cancelled;
    }

    dispatchCommand(bot: Bot, channel: Channel, sender: User, command: string, argument: string): boolean {
        let event = new BotCommandEvent(bot, sender, channel, this.botModule.Namespace, command, argument);

        return bot.CommandHandler.dispatchCommandEvent(event, this.botModule);
    }

    // EventEmiiter overrides

    on(event: string | symbol, listener: (commandEvent: BotCommandEvent, logger: Logger) => void): this {
        return super.on(event, listener);
    }

    once(event: string | symbol, listener: (commandEvent: BotCommandEvent, logger: Logger) => void): this {
        return super.once(event, listener);
    }
}