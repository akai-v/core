/// <reference types="node" />
import { Bot } from "../bot";
import { UserMessage } from "../message/user-message";
import { RichMessageTemplate } from "../message/template/rich-message-template";
import { Channel } from "../channel/channel";
import { EventEmitter } from "events";
import { User } from "../user/user";
import { TemplateHandler } from "../message/template/template-handler";
export declare abstract class BaseClient extends EventEmitter {
    private botHandlerList;
    private defaultRichHandlerList;
    private richHandlerList;
    private clientUser;
    private started;
    constructor();
    abstract readonly ClientId: string;
    abstract readonly ClientName: string;
    abstract readonly ChannelList: Channel[];
    protected abstract createClientUser(): ClientUser;
    private registerDefaultRichHandler;
    readonly ClientUser: ClientUser;
    readonly Started: boolean;
    readonly RichHandlerList: TemplateHandler<BaseClient>[];
    protected readonly BotHandlerList: ClientHandler<BaseClient>[];
    containsHandler(handler: ClientHandler<BaseClient>): boolean;
    protected abstract createHandler(bot: Bot): ClientHandler<BaseClient>;
    start(): Promise<void>;
    stop(): Promise<void>;
    protected abstract startClient(): Promise<void>;
    protected abstract stopClient(): Promise<void>;
    connectToBot(bot: Bot): ClientHandler<BaseClient>;
    disconnectHandler(handler: ClientHandler<BaseClient>): boolean;
    abstract isValidChannel(channel: Channel): boolean;
    abstract isValidUser(user: User): boolean;
    abstract sendText(text: string, channel: Channel): Promise<UserMessage[]>;
    broadcastText(text: string): Promise<UserMessage[]>[];
    sendRichTemplate(template: RichMessageTemplate, channel: Channel): Promise<UserMessage[]>;
    broadcastRichTemplate(template: RichMessageTemplate): Promise<UserMessage[]>[];
    protected messageReceived(message: UserMessage): void;
    on(event: 'message', listener: (...args: any[]) => void): this;
    once(event: 'message', listener: (...args: any[]) => void): this;
}
export declare abstract class ClientHandler<T extends BaseClient> {
    private client;
    private bot;
    constructor(client: T, bot: Bot);
    readonly Bot: Bot;
    readonly Client: T;
    noitifyMessageToBot(message: UserMessage): void;
}
export declare abstract class ClientUser extends User {
    abstract readonly Connected: boolean;
    readonly HasDMChannel: boolean;
    getDMChannel(): Promise<Channel>;
}
