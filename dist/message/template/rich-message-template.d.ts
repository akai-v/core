/// <reference types="node" />
import { AttachmentType } from "../attachment-type";
export interface RichMessageTemplate {
    toString(): string;
}
export declare class MarkdownMessageTemplate implements RichMessageTemplate {
    constructor();
}
export declare class MultiTextTemplate implements RichMessageTemplate {
    private textList;
    constructor(...textList: string[]);
    readonly TextList: string[];
    toString(): string;
}
export declare class AttachmentTemplate implements RichMessageTemplate {
    private text;
    private attachmentList;
    constructor(text: string, ...attachmentList: TemplateAttachment[]);
    readonly AttachmentList: TemplateAttachment[];
    readonly Text: string;
    toString(): string;
}
export declare class TemplateAttachment {
    private name;
    private type;
    private buffer;
    constructor(type: AttachmentType, name: string, buffer: Buffer);
    readonly Type: AttachmentType;
    Name: string;
    Buffer: Buffer;
}
