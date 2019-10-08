"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_manager_1 = require("./command/command-manager");
const events_1 = require("events");
class BotModule extends events_1.EventEmitter {
    constructor() {
        super();
        this.commandManager = new command_manager_1.CommandManager(this);
    }
    get CommandManager() {
        return this.commandManager;
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
}
exports.BotModule = BotModule;
//# sourceMappingURL=bot-module.js.map