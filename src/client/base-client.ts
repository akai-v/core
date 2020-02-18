import { Bot, DispatchedMessage } from "../bot";
import { UserMessage } from "../message/user-message";
import { RichMessageTemplate } from "../message/template/rich-message-template";
import { Channel } from "../channel/channel";
import { EventEmitter } from "events";
import { ClientMessageEvent } from "../bot-event";
import { User } from "../user/user";
import { TemplateHandler, MultiTextTemplateHandler, DefaultTemplateHandler } from "../message/template/template-handler";
import { ClientLogger } from "../logger/logger";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export abstract class BaseClient extends EventEmitter {

    private clientLogger: ClientLogger;

    private readonly botHandlerList: ClientHandler<BaseClient>[];

    private defaultRichHandlerList: TemplateHandler<BaseClient>[];
    private richHandlerList: TemplateHandler<BaseClient>[];

    private clientUser: ClientUser | null;

    private started: boolean;

    constructor() {
        super();

        this.botHandlerList = [];

        this.clientLogger = new ClientLogger(this, this.botHandlerList);

        this.defaultRichHandlerList = [];
        this.richHandlerList = [];

        this.clientUser = null;

        this.started = false;

        this.registerDefaultRichHandler();
    }

    abstract get ClientId(): string;

    abstract get ClientName(): string;

    abstract get ChannelList(): Channel[];

    protected abstract createClientUser(): ClientUser;

    private registerDefaultRichHandler() {
        this.defaultRichHandlerList.push(new MultiTextTemplateHandler(this));
        this.defaultRichHandlerList.push(new DefaultTemplateHandler(this));
    }

    get ClientUser(): ClientUser | null {
        return this.clientUser;
    }

    get Started() {
        return this.started;
    }

    get RichHandlerList() {
        return this.richHandlerList;
    }

    get Logger() {
        return this.clientLogger;
    }

    protected get BotHandlerList() {
        return this.botHandlerList;
    }

    get MaxMessageTextLength() {
        return 1000;
    }

    containsHandler(handler: ClientHandler<BaseClient>) {
        return this.botHandlerList.includes(handler);
    }

    protected abstract createHandler(bot: Bot): ClientHandler<BaseClient>;

    async start(): Promise<void> {
        if (this.started) {
            throw new Error(`Client already started`);
        }

        await this.startClient();

        this.clientUser = this.createClientUser();

        this.started = true;
    }

    async stop(): Promise<void> {
        if (this.started) {
            throw new Error(`Client is not started`);
        }

        await this.stopClient();

        this.clientUser = null;

        this.started = false;
    }

    protected abstract async startClient(): Promise<void>;
    protected abstract async stopClient(): Promise<void>;

    connectToBot(bot: Bot): ClientHandler<BaseClient> {
        let handler = this.createHandler(bot);

        this.botHandlerList.push(handler);

        return handler;
    }

    disconnectHandler(handler: ClientHandler<BaseClient>): boolean {
        if (!this.containsHandler(handler)) {
            return false;
        }

        this.botHandlerList.splice(this.botHandlerList.indexOf(handler), 1);

        return true;
    }

    abstract isValidChannel(channel: Channel): boolean;
    abstract isValidUser(user: User): boolean;

    abstract async sendText(text: string, channel: Channel): Promise<UserMessage[]>;
    
    broadcastText(text: string): Promise<UserMessage[]>[] {
        let reqList: Promise<UserMessage[]>[] = [];
        
        for (let channel of this.ChannelList) {
            reqList.push(this.sendText(text, channel));
        }

        return reqList;
    }

    async sendRichTemplate(template: RichMessageTemplate, channel: Channel): Promise<UserMessage[]> {
        for (let richHandler of this.richHandlerList) {
            if (richHandler.canHandle(template)) {
                return richHandler.send(template, channel);
            }
        }

        for (let defaultRichHandler of this.defaultRichHandlerList) {
            if (defaultRichHandler.canHandle(template)) {
                return defaultRichHandler.send(template, channel);
            }
        }

        throw new Error(`Can't send message ${template.toString()} to ${channel.IdentityId}. Unknown type ${template.constructor}`);
    }

    broadcastRichTemplate(template: RichMessageTemplate): Promise<UserMessage[]>[] {
        let channelList = this.ChannelList;

        let reqList: Promise<UserMessage[]>[] = [];

        for (let channel of channelList) {
            reqList.push(this.sendRichTemplate(template, channel));
        }

        return reqList;
    }

    dispatchChat(channel: Channel, sender: User, text: string, timestamp: number = Date.now()): UserMessage {
        let message = new DispatchedMessage(sender, channel, text, timestamp, []);

        this.messageReceived(message);

        return message;
    }

    // Client implementions must call this method after they received message
    protected messageReceived(message: UserMessage) {
        let event = new ClientMessageEvent(message);

        message.Sender.emit('message', event);

        if (event.Cancelled) {
            return;
        }

        message.Channel.emit('message', event);

        if (event.Cancelled) {
            return;
        }

        this.emit('message', event);

        if (event.Cancelled) {
            return;
        }

        for (let handler of this.botHandlerList) {
            handler.noitifyMessageToBot(message);
        }
    }

    // EventEmiiter overrides

    on(event: 'message', listener: (e: ClientMessageEvent) => void): this;

    on(event: string, listener: (...args: any[]) => void) {
        return super.on(event, listener);
    }

    once(event: 'message', listener: (e: ClientMessageEvent) => void): this;

    once(event: string, listener: (...args: any[]) => void) {
        return super.once(event, listener);
    }

}

export abstract class ClientHandler<T extends BaseClient> {

    private client: T;
    private bot: Bot;

    constructor(client: T, bot: Bot) {
        this.client = client;
        this.bot = bot;
    }

    get Bot() {
        return this.bot;
    }

    get BotLogger() {
        return this.bot.Logger;
    }

    get Client() {
        return this.client;
    }

    noitifyMessageToBot(message: UserMessage) {
        this.bot.onMessage(message);
    }

}

export abstract class ClientUser extends User {

    abstract get Connected(): boolean;

    get HasDMChannel() {
        return false;
    }

    getDMChannel(): Promise<Channel> {
        throw new Error(`ClientUser cannot create DM`);
    }

    get IsClientUser(): boolean {
        return true;
    }

}