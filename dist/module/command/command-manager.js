"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const bot_event_1 = require("../../bot-event");
class CommandManager extends events_1.EventEmitter {
    constructor(module) {
        super();
        this.botModule = module;
    }
    processCommand(message, targetBot, sender, channel) {
        let messagePart = message.split(' ', 2);
        let command = messagePart[0];
        let args = messagePart[1] || '';
        let hasCommand = this.rawListeners(command).length !== 0;
        if (!hasCommand) {
            return false;
        }
        let event = new bot_event_1.BotCommandEvent(targetBot, sender, channel, command, args);
        this.emit(command, event);
        return !event.Cancelled;
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
}
exports.CommandManager = CommandManager;
//# sourceMappingURL=command-manager.js.map