import { BaseClient } from "../../client/base-client";
import { Channel } from "../../channel/channel";
import { AttachmentType } from "../attachment-type";
import { UserMessage } from "../user-message";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export interface RichMessageTemplate {
    
    toString(): string;

}

export class MarkdownMessageTemplate implements RichMessageTemplate {

    constructor() {
        
    }

}

export class MultiTextTemplate implements RichMessageTemplate {

    private textList: string[];

    constructor(...textList: string[]) {
        this.textList = textList;
    }

    get TextList() {
        return this.textList;
    }

    toString() {
        return this.TextList.join('\n');
    }

}

export class AttachmentTemplate implements RichMessageTemplate {

    private text: string;

    private attachmentList: TemplateAttachment[];

    constructor(text: string, ...attachmentList: TemplateAttachment[]) {
        this.text = text;
        this.attachmentList = attachmentList;
    }

    get AttachmentList() {
        return this.attachmentList;
    }

    get Text() {
        return this.text;
    }

    toString() {
        return this.text;
    }
    
}

export class TemplateAttachment {

    private name: string;
    private type: AttachmentType;

    private buffer: Buffer;

    constructor(type: AttachmentType, name: string, buffer: Buffer) {
        this.name = name;
        this.type = type;
        
        this.buffer = buffer;
    }

    get Type() {
        return this.type;
    }

    get Name() {
        return this.name;
    }

    set Name(name) {
        this.name = name;
    }

    get Buffer() {
        return this.buffer;
    }

    set Buffer(buffer) {
        this.buffer = buffer;
    }
}