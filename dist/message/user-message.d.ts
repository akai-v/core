import { User } from "../user/user";
import { Channel } from "../channel/channel";
import { RichMessageTemplate } from "./template/rich-message-template";
import { AttachmentType } from "./attachment-type";
export declare abstract class UserMessage {
    private sender;
    private channel;
    private text;
    private attachmentList;
    constructor(sender: User, channel: Channel, text: string, attachmentList?: MessageAttachment[]);
    readonly Text: string;
    readonly Sender: User;
    readonly Channel: Channel;
    readonly AttachmentList: MessageAttachment[];
    abstract readonly Editable: boolean;
    abstract readonly Deletable: boolean;
    abstract editText(text: string): Promise<UserMessage>;
    editOrReplyText(text: string): Promise<UserMessage[]>;
    replyText(text: string): Promise<UserMessage[]>;
    replyRichTemplate(template: RichMessageTemplate): Promise<UserMessage[]>;
}
export declare class MessageAttachment {
    private type;
    private url;
    constructor(type: AttachmentType, url: string);
    readonly Type: AttachmentType;
    readonly URL: string;
}
