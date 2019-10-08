"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MarkdownMessageTemplate {
    constructor() {
    }
}
exports.MarkdownMessageTemplate = MarkdownMessageTemplate;
class MultiTextTemplate {
    constructor(...textList) {
        this.textList = textList;
    }
    get TextList() {
        return this.textList;
    }
    toString() {
        return this.TextList.join('\n');
    }
}
exports.MultiTextTemplate = MultiTextTemplate;
class AttachmentTemplate {
    constructor(text, ...attachmentList) {
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
exports.AttachmentTemplate = AttachmentTemplate;
class TemplateAttachment {
    constructor(type, name, buffer) {
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
exports.TemplateAttachment = TemplateAttachment;
//# sourceMappingURL=rich-message-template.js.map