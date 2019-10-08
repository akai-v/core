/// <reference types="node" />
import { EventEmitter } from "events";
import { BotModule } from "./bot-module";
import { BotModuleEvent } from "../bot-event";
export declare class ModuleManager extends EventEmitter {
    private moduleList;
    constructor();
    has(module: BotModule): boolean;
    addModule(module: BotModule): boolean;
    removeModule(module: BotModule): boolean;
    forEach(func: (module: BotModule) => void): void;
    on(event: 'add' | 'remove', listener: (e: BotModuleEvent) => void): this;
    once(event: 'add' | 'remove', listener: (e: BotModuleEvent) => void): this;
}
