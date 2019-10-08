/// <reference types="node" />
import { CommandManager } from "./command/command-manager";
import { EventEmitter } from "events";
import { BotMessageEvent } from "../bot-event";
export declare abstract class BotModule extends EventEmitter {
    private commandManager;
    constructor();
    readonly CommandManager: CommandManager;
    abstract readonly Name: string;
    abstract readonly Namespace: string;
    abstract readonly Description: string;
    on(event: 'message', listener: (e: BotMessageEvent) => void): this;
    once(event: 'message', listener: (e: BotMessageEvent) => void): this;
}
