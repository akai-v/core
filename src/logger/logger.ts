import { BaseClient, ClientHandler } from "../client/base-client";
import { Logger as WinstonLogger } from "winston";

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

export class ClientLogger implements Logger {

    constructor(private handlerList: ClientHandler<BaseClient>[]) {
        
    }

    info(message: string) {
        this.loggerForEach(logger => logger.info(message));
    }

    warn(message: string) {
        this.warning(message);
    }

    warning(message: string) {
        this.loggerForEach(logger => logger.warning(message));
    }

    debug(message: string) {
        this.loggerForEach(logger => logger.debug(message));
    }

    error(message: string) {
        this.loggerForEach(logger => logger.error(message));
    }

    protected loggerForEach(func: (logger: Logger) => void) {
        for (let handler of this.handlerList) {
            func(handler.BotLogger);
        }
    }

}