"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class User extends events_1.EventEmitter {
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
        return `${this.client.ClientId}-user-${this.Id}`;
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map