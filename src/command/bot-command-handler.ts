import { Bot } from "../bot";
import { UserMessage } from "../message/user-message";
import { BotModule } from "../module/bot-module";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class BotCommandHandler {

    static readonly NAMESPACE_SEPARATOR = '/';

    private bot: Bot;

    constructor(bot: Bot) {
        this.bot = bot;
    }

    get Bot() {
        return this.bot;
    }

    parseNamespacedCommand(text: string) {
        let parts = text.split(BotCommandHandler.NAMESPACE_SEPARATOR);
        return [ parts.shift(), parts.join(BotCommandHandler.NAMESPACE_SEPARATOR) ];
    }

    handleMessage(message: UserMessage): boolean {
        let commandPartList = this.parseNamespacedCommand(message.Text);

        if (commandPartList[1] === '') {
            return false;
        }
        
        let namespace = commandPartList[0];
        let commandPart = commandPartList[1];

        let result = false;

        this.Bot.ModuleManager.forEach((botModule: BotModule) => {
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