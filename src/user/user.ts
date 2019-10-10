import { Channel } from "../channel/channel";
import { BaseClient } from "../client/base-client";
import { EventEmitter } from "events";
import { ClientMessageEvent } from "../bot-event";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export abstract class User extends EventEmitter {

    private client: BaseClient;
    private id: string;

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
        return `${this.client.ClientId}-user-${this.Id}`;
    }

    abstract get Name(): string;

    abstract get HasDMChannel(): boolean;

    abstract getDMChannel(): Promise<Channel>;

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