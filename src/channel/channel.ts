import { BaseClient } from "../client/base-client";
import { RichMessageTemplate } from "../message/template/rich-message-template";
import { UserMessage } from "../message/user-message";
import { EventEmitter } from "events";
import { ClientMessageEvent } from "../bot-event";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export abstract class Channel extends EventEmitter {

    private id: string;
    
    private client: BaseClient;

    constructor(client: BaseClient, id: string) {
        super();
        
        this.client = client;
        this.id = id;
    }

    get Client() {
        return this.client;
    }

    get Id() {
        return this.id;
    }

    get IdentityId() {
        return `${this.Client.ClientId}-channel-${this.Id}`;
    }

    abstract get Name(): string;

    async sendText(text: string): Promise<UserMessage[]> {
        return this.client.sendText(text, this);
    }

    async sendRichTemplate(template: RichMessageTemplate): Promise<UserMessage[]> {
        return this.client.sendRichTemplate(template, this);
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