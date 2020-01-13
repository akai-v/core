import { BaseClient, ClientHandler } from "../client/base-client";
import { Logger as WinstonLogger } from "winston";
import { BotModule } from "../module/bot-module";

/*
 * Created on Sun Jan 05 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export interface Logger {

    info(message: string): void;

    warn(message: string): void;

    warning(message: string): void;

    debug(message: string): void;

    error(message: string): void;

}

export interface BotLogger extends Logger {

}

export interface SubLogger extends Logger {

    getFormattedMessage(message: string): string;

}

export class NamedSubLogger implements SubLogger {

    constructor(private logger: Logger, private prefix: string, private name: string) {

    }

    info(message: string) {
        this.logger.info(this.getFormattedMessage(message));
    }

    warn(message: string) {
        this.warning(message);
    }

    warning(message: string) {
        this.logger.warning(this.getFormattedMessage(message));
    }

    debug(message: string) {
        this.logger.debug(this.getFormattedMessage(message));
    }

    error(message: string) {
        this.logger.error(this.getFormattedMessage(message));
    }

    get Parent() {
        return this.logger;
    }

    getFormattedMessage(message: string) {
        return `${this.prefix}[ ${this.name} ] - ${message}`;
    }

}

export class ClientLogger implements SubLogger {

    constructor(private client: BaseClient, private handlerList: ClientHandler<BaseClient>[]) {
        
    }

    info(message: string) {
        this.loggerForEach(logger => logger.info(this.getFormattedMessage(message)));
    }

    warn(message: string) {
        this.warning(message);
    }

    warning(message: string) {
        this.loggerForEach(logger => logger.warning(this.getFormattedMessage(message)));
    }

    debug(message: string) {
        this.loggerForEach(logger => logger.debug(this.getFormattedMessage(message)));
    }

    error(message: string) {
        this.loggerForEach(logger => logger.error(this.getFormattedMessage(message)));
    }

    protected loggerForEach(func: (logger: Logger) => void) {
        for (let handler of this.handlerList) {
            func(handler.BotLogger);
        }
    }
    
    getFormattedMessage(message: string) {
        return `client[ ${this.client.ClientName} ] - ${message}`;
    }

}

export class ModuleLogger extends NamedSubLogger {

    constructor(module: BotModule, botLogger: BotLogger) {
        super(botLogger, 'module', module.Name);
    }

}