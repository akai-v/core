"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const bot_event_1 = require("../bot-event");
class ModuleManager extends events_1.EventEmitter {
    constructor() {
        super();
        this.moduleList = [];
    }
    has(module) {
        return this.moduleList.includes(module);
    }
    addModule(module) {
        if (this.has(module)) {
            return false;
        }
        this.moduleList.push(module);
        this.emit('add', new bot_event_1.BotModuleEvent(module));
        return true;
    }
    removeModule(module) {
        if (!this.has(module)) {
            return false;
        }
        this.moduleList.splice(this.moduleList.indexOf(module), 1);
        this.emit('remove', new bot_event_1.BotModuleEvent(module));
        return true;
    }
    forEach(func) {
        this.moduleList.forEach(func);
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
}
exports.ModuleManager = ModuleManager;
//# sourceMappingURL=module-manager.js.map