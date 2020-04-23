import { UserMessage } from "./message/user-message";
import { BotModule } from "./module/bot-module";
import { User } from "./user/user";
import { Channel } from "./channel/channel";
import { Bot } from "./bot";
import { BaseClient } from "./client/base-client";
import { BotLogger } from "./logger/logger";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export interface Cancellable {

    readonly Cancelled: boolean;

    cancel(): void;

}

export interface MessageEvent {

    readonly Message: UserMessage;

}

export class BotEvent {

    constructor() {
        
    }

}

export class ClientEvent {

}

export class BotEventCancellable extends BotEvent implements Cancellable {

    private cancelled: boolean;

    constructor() {
        super();

        this.cancelled = false;
    }

    get Cancelled() {
        return this.cancelled;
    }

    cancel() {
        this.cancelled = true;
    }

}

export class ClientMessageEvent extends ClientEvent implements Cancellable, MessageEvent {

    private message: UserMessage;

    private cancelled: boolean;

    constructor(message: UserMessage) {
        super();

        this.message = message;

        this.cancelled = false;
    }

    get Message() {
        return this.message;
    }

    get Cancelled() {
        return this.cancelled;
    }

    cancel() {
        this.cancelled = true;
    }

}

export class BotMessageEvent extends BotEventCancellable implements MessageEvent {

    private message: UserMessage;
    private targetBot: Bot;
    private isCommand: boolean;

    constructor(targetBot: Bot, message: UserMessage, isCommand: boolean) {
        super();

        this.message = message;

        this.targetBot = targetBot;

        this.isCommand = isCommand;
    }

    get TargetBot() {
        return this.targetBot;
    }

    get Message() {
        return this.message;
    }

    get IsCommand() {
        return this.isCommand;
    }

}

export class BotStatusChangeEvent extends BotEventCancellable {

    private lastStatus: string;
    private currentStatus: string;

    constructor(lastStatus: string, currentStatus: string) {
        super();

        this.lastStatus = lastStatus;
        this.currentStatus = currentStatus;
    }

    get LastStatus() {
        return this.lastStatus;
    }

    get CurrentStatus() {
        return this.currentStatus;
    }

}

export class BotCommandEvent extends BotEventCancellable {

    private targetBot: Bot;

    private dispatched: boolean;

    private sender: User;

    private channel: Channel;

    private namespace: string;
    
    private command: string;

    private rawArgument: string;

    constructor(targetBot: Bot, sender: User, channel: Channel, namespace: string, command: string, rawArgument: string, dispatched: boolean = false) {
        super();

        this.targetBot = targetBot;

        this.sender = sender;
        this.channel = channel;

        this.namespace = namespace;

        this.command = command;
        this.rawArgument = rawArgument;

        this.dispatched = dispatched;
    }

    get TargetBot() {
        return this.targetBot;
    }

    get Sender() {
        return this.sender;
    }

    get Channel() {
        return this.channel;
    }

    get Namespace() {
        return this.namespace;
    }

    get Command() {
        return this.command;
    }

    get RawArgument() {
        return this.rawArgument;
    }

    get Dispatched() {
        return this.dispatched;
    }

}

export interface ModuleEvent {

    readonly Module: BotModule;
    
}

export class BotModuleEvent implements ModuleEvent {
    
    private module: BotModule;

    constructor(module: BotModule) {
        this.module = module;
    }

    get Module() {
        return this.module;
    }

}