"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BotCommandHandler {
    constructor(bot) {
        this.bot = bot;
    }
    get Bot() {
        return this.bot;
    }
    parseNamespacedCommand(text) {
        return text.split(BotCommandHandler.NAMESPACE_SEPARATOR, 2);
    }
    handleMessage(message) {
        let commandPartList = this.parseNamespacedCommand(message.Text);
        if (commandPartList.length !== 2) {
            return false;
        }
        let namespace = commandPartList[0];
        let commandPart = commandPartList[1];
        let result = false;
        this.Bot.ModuleManager.forEach((botModule) => {
            if (botModule.Namespace === namespace) {
                let handled = botModule.CommandManager.processCommand(commandPart, this.Bot, message.Sender, message.Channel);
                if (!handled) {
                    return;
                }
                if (!result) {
                    result = true;
                }
            }
        });
        return result;
    }
}
BotCommandHandler.NAMESPACE_SEPARATOR = '/';
exports.BotCommandHandler = BotCommandHandler;
//# sourceMappingURL=bot-command-handler.js.map