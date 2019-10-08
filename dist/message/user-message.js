"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserMessage {
    constructor(sender, channel, text, attachmentList = []) {
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
    async editOrReplyText(text) {
        if (this.Editable) {
            return [await this.editText(text)];
        }
        return this.replyText(text);
    }
    async replyText(text) {
        return this.Channel.sendText(text);
    }
    async replyRichTemplate(template) {
        return this.Channel.sendRichTemplate(template);
    }
}
exports.UserMessage = UserMessage;
class MessageAttachment {
    constructor(type, url) {
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
exports.MessageAttachment = MessageAttachment;
//# sourceMappingURL=user-message.js.map