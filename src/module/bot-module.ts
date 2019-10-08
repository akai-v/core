import { CommandManager } from "./command/command-manager";
import { EventEmitter } from "events";
import { BotMessageEvent } from "../bot-event";

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

    on(event: 'message', listener: (e: BotMessageEvent) => void): this {
        return super.on(event, listener);
    }

    once(event: 'message', listener: (e: BotMessageEvent) => void): this {
        return super.once(event, listener);
    }

}