/// <reference types="node" />
import { BaseClient } from "./client/base-client";
import { EventEmitter } from "events";
import { UserMessage } from "./message/user-message";
import { BotCommandHandler } from "./command/bot-command-handler";
import { ModuleManager } from "./module/module-manager";
export declare abstract class Bot extends EventEmitter {
    private name;
    private statusMessage;
    private started;
    private clientMap;
    private commandHandler;
    private moduleManager;
    constructor(name: string, statusMessage?: string);
    StatusMessage: string;
    readonly Name: string;
    readonly Started: boolean;
    readonly ClientList: IterableIterator<BaseClient>;
    readonly ModuleManager: ModuleManager;
    readonly CommandHandler: BotCommandHandler;
    containsClient(client: BaseClient): boolean;
    registerClient(client: BaseClient): boolean;
    unregisterClient(client: BaseClient): boolean;
    start(): void;
    stop(): void;
    onMessage(message: UserMessage): void;
    protected abstract onStart(): void;
    protected abstract onStop(): void;
    on(event: 'status_message' | 'message' | 'stop' | 'start', listener: (...args: any[]) => void): this;
    once(event: 'status_message' | 'message' | 'stop' | 'start', listener: (...args: any[]) => void): this;
}
