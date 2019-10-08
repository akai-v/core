/// <reference types="node" />
import { Channel } from "../channel/channel";
import { BaseClient } from "../client/base-client";
import { EventEmitter } from "events";
import { ClientMessageEvent } from "../bot-event";
export declare abstract class User extends EventEmitter {
    private client;
    private id;
    constructor(client: BaseClient, id: string);
    readonly Client: BaseClient;
    readonly Id: string;
    readonly IdentityId: string;
    abstract readonly Name: string;
    abstract readonly HasDMChannel: boolean;
    abstract getDMChannel(): Promise<Channel>;
    on(event: 'message', listener: (e: ClientMessageEvent) => void): this;
    once(event: 'message', listener: (e: ClientMessageEvent) => void): this;
}
