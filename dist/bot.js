"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const bot_command_handler_1 = require("./command/bot-command-handler");
const bot_event_1 = require("./bot-event");
const module_manager_1 = require("./module/module-manager");
class Bot extends events_1.EventEmitter {
    constructor(name, statusMessage = "") {
        super();
        this.name = name;
        this.statusMessage = statusMessage;
        this.started = false;
        this.clientMap = new Map();
        this.commandHandler = new bot_command_handler_1.BotCommandHandler(this);
        this.moduleManager = new module_manager_1.ModuleManager();
    }
    get StatusMessage() {
        return this.statusMessage;
    }
    get Name() {
        return this.name;
    }
    get Started() {
        return this.started;
    }
    get ClientList() {
        return this.clientMap.keys();
    }
    get ModuleManager() {
        return this.moduleManager;
    }
    get CommandHandler() {
        return this.commandHandler;
    }
    set StatusMessage(message) {
        if (this.statusMessage === message) {
            return;
        }
        let lastMessage = this.statusMessage;
        this.statusMessage = message;
        this.emit('status_message', new bot_event_1.BotStatusChangeEvent(lastMessage, this.statusMessage));
    }
    containsClient(client) {
        return this.clientMap.has(client);
    }
    registerClient(client) {
        if (this.containsClient(client)) {
            return false;
        }
        this.clientMap.set(client, client.connectToBot(this));
        return true;
    }
    unregisterClient(client) {
        if (!this.containsClient(client)) {
            return false;
        }
        let handler = this.clientMap.get(client);
        this.clientMap.delete(client);
        return client.disconnectHandler(handler);
    }
    start() {
        if (this.started) {
            throw new Error(`${this.Name} already started.`);
        }
        this.started = true;
        this.onStart();
        this.emit('start');
    }
    stop() {
        if (!this.started) {
            throw new Error(`${this.Name} is not started.`);
        }
        this.started = false;
        this.onStop();
        this.emit('stop');
    }
    onMessage(message) {
        let event = new bot_event_1.BotMessageEvent(this, message);
        this.emit('message', event);
        if (event.Cancelled) {
            return;
        }
        this.ModuleManager.forEach((botModule) => {
            botModule.emit('message', event);
        });
        if (event.Cancelled) {
            return;
        }
        let isCommand = this.commandHandler.handleMessage(message);
        if (isCommand) {
            return;
        }
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
}
exports.Bot = Bot;
//# sourceMappingURL=bot.js.map