import { Bot } from "../bot";
import { UserMessage } from "../message/user-message";
export declare class BotCommandHandler {
    static readonly NAMESPACE_SEPARATOR = "/";
    private bot;
    constructor(bot: Bot);
    readonly Bot: Bot;
    parseNamespacedCommand(text: string): string[];
    handleMessage(message: UserMessage): boolean;
}
