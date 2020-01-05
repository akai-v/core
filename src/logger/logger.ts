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

export class ModuleLogger implements SubLogger {

    constructor(private module: BotModule, private botLogger: BotLogger) {
        
    }

    info(message: string) {
        this.botLogger.info(this.getFormattedMessage(message));
    }

    warn(message: string) {
        this.warning(message);
    }

    warning(message: string) {
        this.botLogger.warning(this.getFormattedMessage(message));
    }

    debug(message: string) {
        this.botLogger.debug(this.getFormattedMessage(message));
    }

    error(message: string) {
        this.botLogger.error(this.getFormattedMessage(message));
    }

    getFormattedMessage(message: string): string {
        return `module[ ${this.module.Name} ] - ${message}`;
    }

}