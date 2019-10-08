import { UserMessage } from "./message/user-message";
import { BotModule } from "./module/bot-module";
import { User } from "./user/user";
import { Channel } from "./channel/channel";
import { Bot } from "./bot";
export declare class BotEvent {
    constructor();
}
export declare class BotEventCancellable extends BotEvent {
    private cancelled;
    constructor();
    readonly Cancelled: boolean;
    cancel(): void;
}
export declare class ClientMessageEvent extends BotEventCancellable {
    private message;
    constructor(message: UserMessage);
    readonly Message: UserMessage;
}
export declare class BotMessageEvent extends ClientMessageEvent {
    private targetBot;
    constructor(targetBot: Bot, message: UserMessage);
    readonly TargetBot: Bot;
}
export declare class BotStatusChangeEvent extends BotEventCancellable {
    private lastStatus;
    private currentStatus;
    constructor(lastStatus: string, currentStatus: string);
    readonly LastStatus: string;
    readonly CurrentStatus: string;
}
export declare class BotCommandEvent extends BotEventCancellable {
    private targetBot;
    private sender;
    private channel;
    private command;
    private rawArgument;
    constructor(targetBot: Bot, sender: User, channel: Channel, command: string, rawArgument: string);
    readonly TargetBot: Bot;
    readonly Sender: User;
    readonly Channel: Channel;
    readonly Command: string;
    readonly RawArgument: string;
}
export declare class BotModuleEvent extends BotEvent {
    private module;
    constructor(module: BotModule);
    readonly Module: BotModule;
}
