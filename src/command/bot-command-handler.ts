import { Bot } from "../bot";
import { UserMessage } from "../message/user-message";
import { BotModule } from "../module/bot-module";
import { BotCommandEvent } from "../bot-event";
import { User } from "../user/user";
import { Channel } from "../channel/channel";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class BotCommandHandler {

    static readonly NAMESPACE_SEPARATOR = '/';
    static readonly ARGUMENT_SEPARATOR = ' ';

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

    parseCommand(text: string) {
        let parts = text.split(BotCommandHandler.ARGUMENT_SEPARATOR);
        return [ parts.shift(), parts.join(BotCommandHandler.ARGUMENT_SEPARATOR) ];
    }

    handleMessage(message: UserMessage): boolean {
        return this.handleCommandText(message.Channel, message.Sender, message.Text);
    }

    dispatchCommand(channel: Channel, sender: User, command: string): boolean {
        return this.handleCommandText(channel, sender, command);
    }

    protected handleCommandText(channel: Channel, sender: User, text: string): boolean {
        let commandPartList = this.parseNamespacedCommand(text);

        if (commandPartList[1] === '') {
            return false;
        }
        
        let namespace = commandPartList[0];
        let commandPart = commandPartList[1];

        let partParsed = this.parseCommand(commandPart);

        let event = new BotCommandEvent(this.Bot, sender, channel, namespace, partParsed[0], partParsed[1]);

        this.Bot.emit('command', event);

        if (event.Cancelled) {
            return false;
        }

        let result = false;

        this.bot.ModuleManager.forEachLoaded((botModule: BotModule) => {
            if (botModule.Namespace === namespace) {

                let handled = this.dispatchCommandEvent(event, botModule);
                
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

    dispatchCommandEvent(event: BotCommandEvent, botModule: BotModule): boolean {
        try {
            return botModule.CommandManager.processCommandEvent(event, this.bot.ModuleManager.getModuleLogger(botModule));
        } catch(e) {
            this.bot.Logger.error(`Error while handling command "${event.Command}" on module: ${botModule.Name}. ${e}`);
            return false;
        }
    }


}