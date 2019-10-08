/// <reference types="node" />
import { BotModule } from "../bot-module";
import { EventEmitter } from "events";
import { BotCommandEvent } from "../../bot-event";
import { User } from "../../user/user";
import { Channel } from "../../channel/channel";
import { Bot } from "../../bot";
export declare class CommandManager extends EventEmitter {
    private botModule;
    constructor(module: BotModule);
    processCommand(message: string, targetBot: Bot, sender: User, channel: Channel): boolean;
    on(event: string | symbol, listener: (commandEvent: BotCommandEvent) => void): this;
    once(event: string | symbol, listener: (commandEvent: BotCommandEvent) => void): this;
}
