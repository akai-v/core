/// <reference types="node" />
import { BaseClient } from "../client/base-client";
import { RichMessageTemplate } from "../message/template/rich-message-template";
import { UserMessage } from "../message/user-message";
import { EventEmitter } from "events";
export declare abstract class Channel extends EventEmitter {
    private id;
    private client;
    constructor(client: BaseClient, id: string);
    readonly Client: BaseClient;
    readonly Id: string;
    readonly IdentityId: string;
    abstract readonly Name: string;
    sendText(text: string): Promise<UserMessage[]>;
    sendRichTemplate(template: RichMessageTemplate): Promise<UserMessage[]>;
    on(event: 'message', listener: (...args: any[]) => void): this;
    once(event: 'message', listener: (...args: any[]) => void): this;
}
