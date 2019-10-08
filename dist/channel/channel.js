"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Channel extends events_1.EventEmitter {
    constructor(client, id) {
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
    async sendText(text) {
        return this.client.sendText(text, this);
    }
    async sendRichTemplate(template) {
        return this.client.sendRichTemplate(template, this);
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
}
exports.Channel = Channel;
//# sourceMappingURL=channel.js.map