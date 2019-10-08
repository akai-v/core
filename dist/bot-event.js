"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BotEvent {
    constructor() {
    }
}
exports.BotEvent = BotEvent;
class BotEventCancellable extends BotEvent {
    constructor() {
        super();
        this.cancelled = false;
    }
    get Cancelled() {
        return this.cancelled;
    }
    cancel() {
        this.cancelled = true;
    }
}
exports.BotEventCancellable = BotEventCancellable;
class ClientMessageEvent extends BotEventCancellable {
    constructor(message) {
        super();
        this.message = message;
    }
    get Message() {
        return this.message;
    }
}
exports.ClientMessageEvent = ClientMessageEvent;
class BotMessageEvent extends ClientMessageEvent {
    constructor(targetBot, message) {
        super(message);
        this.targetBot = targetBot;
    }
    get TargetBot() {
        return this.targetBot;
    }
}
exports.BotMessageEvent = BotMessageEvent;
class BotStatusChangeEvent extends BotEventCancellable {
    constructor(lastStatus, currentStatus) {
        super();
        this.lastStatus = lastStatus;
        this.currentStatus = currentStatus;
    }
    get LastStatus() {
        return this.lastStatus;
    }
    get CurrentStatus() {
        return this.currentStatus;
    }
}
exports.BotStatusChangeEvent = BotStatusChangeEvent;
class BotCommandEvent extends BotEventCancellable {
    constructor(targetBot, sender, channel, command, rawArgument) {
        super();
        this.targetBot = targetBot;
        this.sender = sender;
        this.channel = channel;
        this.command = command;
        this.rawArgument = rawArgument;
    }
    get TargetBot() {
        return this.targetBot;
    }
    get Sender() {
        return this.sender;
    }
    get Channel() {
        return this.channel;
    }
    get Command() {
        return this.command;
    }
    get RawArgument() {
        return this.rawArgument;
    }
}
exports.BotCommandEvent = BotCommandEvent;
class BotModuleEvent extends BotEvent {
    constructor(module) {
        super();
        this.module = module;
    }
    get Module() {
        return this.module;
    }
}
exports.BotModuleEvent = BotModuleEvent;
//# sourceMappingURL=bot-event.js.map