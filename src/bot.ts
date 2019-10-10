import { BaseClient, ClientHandler } from "./client/base-client";
import { UserMessage } from "./message/user-message";
import { BotCommandHandler } from "./command/bot-command-handler";
import { BotStatusChangeEvent, BotMessageEvent, BotEvent, BotCommandEvent } from "./bot-event";
import { ModuleManager } from "./module/module-manager";
import { EventEmitter } from "eventemitter3";
import { BotModule } from "./module/bot-module";
import { Channel, User } from ".";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export abstract class Bot extends EventEmitter {

    private name: string;
    private statusMessage: string;

    private started: boolean;

    private clientMap: Map<BaseClient, ClientHandler<BaseClient>>;
    
    private commandHandler: BotCommandHandler;

    private moduleManager: ModuleManager;

    constructor(name: string, statusMessage: string = "") {
        super();

        this.name = name;
        this.statusMessage = statusMessage;

        this.started = false;

        this.clientMap = new Map<BaseClient, ClientHandler<BaseClient>>();

        this.commandHandler = new BotCommandHandler(this);
        this.moduleManager = new ModuleManager();
    }

    get StatusMessage() {
        return this.statusMessage;
    }

    get Name() {
        return this.name;
    }

    get Started() {
        return this.started;
    }

    get ClientList() {
        return this.clientMap.keys();
    }

    get ModuleManager() {
        return this.moduleManager;
    }

    get CommandHandler() {
        return this.commandHandler;
    }

    set StatusMessage(message) {
        if (this.statusMessage === message) {
            return;
        }

        let lastMessage = this.statusMessage;
        this.statusMessage = message;
        this.emit('status_message', new BotStatusChangeEvent(lastMessage, this.statusMessage));
    }

    containsClient(client: BaseClient): boolean {
        return this.clientMap.has(client);
    }

    registerClient(client: BaseClient): boolean {
        if (this.containsClient(client)) {
            return false;
        }

        this.clientMap.set(client, client.connectToBot(this));

        return true;
    }

    unregisterClient(client: BaseClient): boolean {
        if (!this.containsClient(client)) {
            return false;
        }

        let handler = this.clientMap.get(client)!;

        this.clientMap.delete(client);

        return client.disconnectHandler(handler);
    }

    start() {
        if (this.started) {
            throw new Error(`${this.Name} already started.`);
        }
        this.started = true;

        this.onStart();
        this.emit('start');
    }
    
    stop() {
        if (!this.started) {
            throw new Error(`${this.Name} is not started.`);
        }
        this.started = false;

        this.onStop();
        this.emit('stop');
    }

    dispatchCommand(channel: Channel, sender: User, command: string): boolean {
        return this.CommandHandler.dispatchCommand(channel, sender, command);
    }

    dispatchChat(channel: Channel, sender: User, text: string): UserMessage {
        return channel.Client.dispatchChat(channel, sender, text);
    }

    onMessage(message: UserMessage) {
        let event = new BotMessageEvent(this, message);

        this.emit('message', event);

        if (event.Cancelled) {
            return;
        }

        this.ModuleManager.forEach((botModule: BotModule) => {
            botModule.emit('message', event);
        });


        if (event.Cancelled) {
            return;
        }

        let isCommand = this.commandHandler.handleMessage(message);

        if (isCommand) {
            return;
        }
    }

    // register clients here
    protected abstract onStart(): void;

    protected abstract onStop(): void;

    // EventEmitter override

    on(event: 'status_message', listener: (e: BotStatusChangeEvent) => void): this;

    on(event: 'message', listener: (e: BotMessageEvent) => void): this;
    on(event: 'command', listener: (e: BotCommandEvent) => void): this;

    on(event: 'start', listener: () => void): this;
    on(event: 'stop', listener: () => void): this;

    on(event: string, listener: (...args: any[]) => void) {
        return super.on(event, listener);
    }

    once(event: 'status_message', listener: (e: BotStatusChangeEvent) => void): this;
    
    once(event: 'message', listener: (e: BotMessageEvent) => void): this;
    once(event: 'command', listener: (e: BotCommandEvent) => void): this;

    once(event: 'start', listener: () => void): this;
    once(event: 'stop', listener: () => void): this;

    once(event: string, listener: (...args: any[]) => void) {
        return super.once(event, listener);
    }

}

export class DispatchedMessage extends UserMessage {
    
    get Editable(): boolean {
        return false;
    }
    
    get Deletable(): boolean {
        return false;
    }

    editText(text: string): Promise<UserMessage> {
        throw new Error("Cannot edit dispatched message.");
    }

    delete(): Promise<boolean> {
        throw new Error("Cannot delete dispatched message.");
    }

}