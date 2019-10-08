"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const bot_event_1 = require("../bot-event");
const user_1 = require("../user/user");
const template_handler_1 = require("../message/template/template-handler");
class BaseClient extends events_1.EventEmitter {
    constructor() {
        super();
        this.botHandlerList = [];
        this.defaultRichHandlerList = [];
        this.richHandlerList = [];
        this.clientUser = null;
        this.started = false;
        this.registerDefaultRichHandler();
    }
    registerDefaultRichHandler() {
        this.defaultRichHandlerList.push(new template_handler_1.MultiTextTemplateHandler(this));
        this.defaultRichHandlerList.push(new template_handler_1.DefaultTemplateHandler(this));
    }
    get ClientUser() {
        return this.clientUser;
    }
    get Started() {
        return this.started;
    }
    get RichHandlerList() {
        return this.richHandlerList;
    }
    get BotHandlerList() {
        return this.botHandlerList;
    }
    containsHandler(handler) {
        return this.botHandlerList.includes(handler);
    }
    async start() {
        if (this.started) {
            throw new Error(`Client already started`);
        }
        await this.startClient();
        this.clientUser = this.createClientUser();
        this.started = true;
    }
    async stop() {
        if (this.started) {
            throw new Error(`Client is not started`);
        }
        await this.stopClient();
        this.clientUser = null;
        this.started = false;
    }
    connectToBot(bot) {
        let handler = this.createHandler(bot);
        this.botHandlerList.push(handler);
        return handler;
    }
    disconnectHandler(handler) {
        if (!this.containsHandler(handler)) {
            return false;
        }
        this.botHandlerList.splice(this.botHandlerList.indexOf(handler), 1);
        return true;
    }
    broadcastText(text) {
        let reqList = [];
        for (let channel of this.ChannelList) {
            reqList.push(this.sendText(text, channel));
        }
        return reqList;
    }
    async sendRichTemplate(template, channel) {
        for (let richHandler of this.richHandlerList) {
            if (richHandler.canHandle(template)) {
                return await richHandler.send(template, channel);
            }
        }
        for (let defaultRichHandler of this.defaultRichHandlerList) {
            if (defaultRichHandler.canHandle(template)) {
                return await defaultRichHandler.send(template, channel);
            }
        }
        throw new Error(`Can't send message ${template.toString()} to ${channel.IdentityId}. Unknown type ${template.constructor}`);
    }
    broadcastRichTemplate(template) {
        let channelList = this.ChannelList;
        let reqList = [];
        for (let channel of channelList) {
            reqList.push(this.sendRichTemplate(template, channel));
        }
        return reqList;
    }
    messageReceived(message) {
        let event = new bot_event_1.ClientMessageEvent(message);
        message.Sender.emit('message', event);
        if (event.Cancelled) {
            return;
        }
        message.Channel.emit('message', event);
        if (event.Cancelled) {
            return;
        }
        this.emit('message', event);
        if (event.Cancelled) {
            return;
        }
        for (let handler of this.botHandlerList) {
            handler.noitifyMessageToBot(message);
        }
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
}
exports.BaseClient = BaseClient;
class ClientHandler {
    constructor(client, bot) {
        this.client = client;
        this.bot = bot;
    }
    get Bot() {
        return this.bot;
    }
    get Client() {
        return this.client;
    }
    noitifyMessageToBot(message) {
        this.bot.onMessage(message);
    }
}
exports.ClientHandler = ClientHandler;
class ClientUser extends user_1.User {
    get HasDMChannel() {
        return false;
    }
    getDMChannel() {
        throw new Error(`ClientUser cannot create DM`);
    }
}
exports.ClientUser = ClientUser;
//# sourceMappingURL=base-client.js.map