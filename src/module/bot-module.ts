import { CommandManager } from "./command/command-manager";
import { EventEmitter } from "events";
import { BotMessageEvent, BotCommandEvent } from "../bot-event";
import { ModuleLogger } from "../logger/logger";
import { Logger } from "winston";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export abstract class BotModule extends EventEmitter {

    private commandManager: CommandManager;

    constructor() {
        super();

        this.commandManager = new CommandManager(this);
    }

    get CommandManager() {
        return this.commandManager;
    }

    abstract get Name(): string;

    abstract get Namespace(): string;

    abstract get Description(): string;

    // EventEmiiter overrides

    on(event: 'message', listener: (e: BotMessageEvent, logger: Logger) => void): this;
    on(event: 'command', listener: (e: BotCommandEvent, logger: Logger) => void): this;

    on(event: string, listener: (...args: any[]) => void) {
        return super.on(event, listener);
    }

    once(event: 'message', listener: (e: BotMessageEvent, logger: Logger) => void): this;
    once(event: 'command', listener: (e: BotCommandEvent, logger: Logger) => void): this;

    once(event: string, listener: (...args: any[]) => void) {
        return super.once(event, listener);
    }

}