import { UserMessage } from "./message/user-message";
import { BotModule } from "./module/bot-module";
import { User } from "./user/user";
import { Channel } from "./channel/channel";
import { Bot } from "./bot";
import { BaseClient } from "./client/base-client";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class BotEvent {

    constructor() {

    }

}

export class BotEventCancellable extends BotEvent {

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

export class ClientMessageEvent extends BotEventCancellable {

    private message: UserMessage;

    constructor(message: UserMessage) {
        super();

        this.message = message;
    }

    get Message() {
        return this.message;
    }

}

export class BotMessageEvent extends ClientMessageEvent {

    private targetBot: Bot;

    constructor(targetBot: Bot, message: UserMessage) {
        super(message);

        this.targetBot = targetBot;
    }

    get TargetBot() {
        return this.targetBot;
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

export class BotModuleEvent extends BotEvent {
    
    private module: BotModule;

    constructor(module: BotModule) {
        super();

        this.module = module;
    }

    get Module() {
        return this.module;
    }

}