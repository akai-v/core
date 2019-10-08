import { User } from "../user/user";
import { Channel } from "../channel/channel";
import { RichMessageTemplate } from "./template/rich-message-template";
import { AttachmentType } from "./attachment-type";
import { BaseClient } from "../client/base-client";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export abstract class UserMessage {

    private sender: User;

    private channel: Channel;

    private text: string;
    private attachmentList: MessageAttachment[];

    constructor(sender: User, channel: Channel, text: string, attachmentList: MessageAttachment[] = []) {
        this.sender = sender;

        this.channel = channel;

        this.text = text;

        this.attachmentList = attachmentList;
    }

    get Text() {
        return this.text;
    }

    get Sender() {
        return this.sender;
    }

    get Channel() {
        return this.channel;
    }

    get AttachmentList() {
        return this.attachmentList;
    }

    abstract get Editable(): boolean;

    abstract get Deletable(): boolean;

    abstract async editText(text: string): Promise<UserMessage>;

    async editOrReplyText(text: string): Promise<UserMessage[]> {
        if (this.Editable) {
            return [ await this.editText(text) ];
        }

        return this.replyText(text);
    }

    async replyText(text: string): Promise<UserMessage[]> {
        return this.Channel.sendText(text);
    }

    async replyRichTemplate(template: RichMessageTemplate): Promise<UserMessage[]> {
        return this.Channel.sendRichTemplate(template);
    }

}

export class MessageAttachment {
    
    private type: AttachmentType;

    private url: string;

    constructor(type: AttachmentType, url: string) {
        this.type = type;
        this.url = url;
    }

    get Type() {
        return this.type;
    }

    get URL() {
        return this.url;
    }

}