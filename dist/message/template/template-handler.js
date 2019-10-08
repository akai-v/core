"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
class TemplateHandler {
    constructor(client) {
        this.client = client;
    }
    get Client() {
        return this.client;
    }
}
exports.TemplateHandler = TemplateHandler;
class DefaultTemplateHandler extends TemplateHandler {
    canHandle(template) {
        return !!template;
    }
    async send(template, channel) {
        return this.Client.sendText(template.toString(), channel);
    }
}
exports.DefaultTemplateHandler = DefaultTemplateHandler;
class MultiTextTemplateHandler extends TemplateHandler {
    canHandle(template) {
        return template && template instanceof __1.MultiTextTemplate;
    }
    async send(template, channel) {
        let list = [];
        for (let text of template.TextList) {
            for (let message of await this.Client.sendText(text, channel)) {
                list.push(message);
            }
        }
        return list;
    }
}
exports.MultiTextTemplateHandler = MultiTextTemplateHandler;
//# sourceMappingURL=template-handler.js.map